class TestingController < ApplicationController
require "#{RAILS_ROOT}/HolidayValidator.rb" 
require "#{RAILS_ROOT}/lib/marshal.rb"

	def dumpClass(class_name)
		data=""
		eval("data= %s.all" % class_name)
		txt=data.to_json
		File.open(("%s/%s.yaml" % [@dir,class_name] ), 'w') {|f| f.write(txt) }
	end
	
  def dump_data
	@dir= "#{RAILS_ROOT}/db/data_dump"
	str=""
	begin
		FileUtils.rm_r @dir
	rescue
	end
	FileUtils.mkdir @dir
	
	str= dumpClass "Country"
	str= dumpClass "Currency"
	str= dumpClass "IceClass"
	str= dumpClass "LightNaviTarif"
	str= dumpClass "PilotageCharge"
	str= dumpClass "PilotageDiapason"
	str= dumpClass "Port"
	str= dumpClass "TreeElement"
	str= dumpClass "VesselType"
	str= dumpClass "Vessel"
	
	render :text=> "OK"
  end

  def save_db (cls,contents)
	data= ActiveSupport::JSON.decode contents
	data.each{|row|
		eval ("%s.new(%s)" % [cls,row.to_s])
	}
	
  end
  def load_yaml
	@txt=""
    @dir= "#{RAILS_ROOT}/db/data_dump"
	Dir.chdir(@dir)
	files=[]
	Dir.foreach(@dir) {|x| 
		if(x =~ /.yaml$/)
			full_path= ("%s/%s" % [@dir,x] )
			files.push full_path
			contents=""
			File.open(full_path , 'r') {|f| 
				f.each_line do |line|
					contents += line
				end
			}
			cls= x[0,x.length-5]
			save_db cls, contents
		end
	}
	render :text=> @txt
  end
  
  def routes
	txt=""
	all_routes = ENV['CONTROLLER'] ? ActionController::Routing::Routes.routes.select { |route| route.defaults[:controller] == ENV['CONTROLLER'] } : ActionController::Routing::Routes.routes
	routes = all_routes.collect do |route|
		name = ActionController::Routing::Routes.named_routes.routes.index(route).to_s
		verb = route.conditions[:method].to_s.upcase
		segs = route.segments.inject("") { |str,s| str << s.to_s }
		segs.chop! if segs.length > 1
		reqs = route.requirements.empty? ? "" : route.requirements.inspect
		{:name => name, :verb => verb, :segs => segs, :reqs => reqs}
	 end
	  name_width = routes.collect {|r| r[:name]}.collect {|n| n.length}.max
	  verb_width = routes.collect {|r| r[:verb]}.collect {|v| v.length}.max
	  segs_width = routes.collect {|r| r[:segs]}.collect {|s| s.length}.max
	  routes.each do |r|
		txt << "#{r[:name].rjust(name_width)} #{r[:verb].ljust(verb_width)} #{r[:segs].ljust(segs_width)} #{r[:reqs]}"
	  end
	render :text=> txt  
  end

  def calc(proforma, testVal)
    unless testVal.blank?
      #evaluatedValue= (((proforma.gw * 0.45) /100)*25)
      txt= "evaluatedValue= %s" % testVal
      eval txt
    else
      evaluatedValue=0
    end
    evaluatedValue.to_f

  end

  def calcLh (proforma)
    ret=0
    remark=""
    ln= LightNaviTarif.find(:first, :conditions => [ ":u >=gt_from and :u<=gt_to ", { :u => proforma.gw }])
    ret=ln.lighthouse

    if proforma.vessel.vessel_flag.is_euro==1
      ret= ret * 0.75
      remark << " incl. 25% rebate"
    end
    unless (["PAS","CRU","CCR"].index( proforma.vessel.type.code).nil?)
      ret= ret * 0.6
      remark << " incl. 40% rebate. $50.10(1)"
    end
    if ( proforma.vessel.ice_class && ["1A Super","1A"].index( proforma.vessel.ice_class.code).nil?)
      ret= ret * 0.5
      remark << " incl. 50% rebate.  $50.10(2)"
    end
    if ( proforma.sailed-proforma.arrived < (60*60*24) )
      ret= ret * 0.7
      remark << " incl. 30% rebate.  $50.10(3)"
    end
    [ret, remark]
  end

  def calcVal (proforma)
    remark=""
    price_in=0
    price_out=0
    holidayValidator= HolidayValidator.new

    pilotGtDiap= PilotageDiapason.find(:first, :conditions => ["? >=pilotage_from and ? <=pilotage_to", proforma.pilotage, proforma.pilotage], :order => "pilotage_from")
    if pilotGtDiap.nil?
      #More than 25 miles
      if (proforma.gw<=50000)
        price_in=proforma.pilotage * 250
        price_out=proforma.pilotage * 250
        remark<< "250 EEK per mile"
      else
        price_in=proforma.pilotage * 350
        price_out=proforma.pilotage * 350
        remark<< "350 EEK per mile"
      end
    else
      pilotCharge= PilotageCharge.find(:first, :conditions => ["diapason_id=? and ? >=gt_from and ? <=gt_to", pilotGtDiap.id, proforma.gw, proforma.gw], :order => "gt_from")
      price_in=pilotCharge.tarif
      price_out=pilotCharge.tarif
      remark<< "%.2f * 2" %pilotCharge.tarif
    end

    #overtime from 18:00 -06:00 and weekends 1.25 public holidays 1.5
    holiday_arrive=holidayValidator.is_holiday (proforma.arrived)
    if (holiday_arrive=="")
      if (proforma.arrived.wday>4 || (proforma.arrived.hour>=18 || proforma.arrived.hour<6))
        price_in=price_in*1.25
        remark<< " including 25% for overtime"
      end
    else
      price_in=price_in*1.5
      remark << " including 50% for overtime"
    end

    if (holidayValidator.is_holiday (proforma.arrived))
      if (proforma.sailed.wday>4 || (proforma.sailed.hour>=18 || proforma.sailed.hour<6))
        price_out=price_out*1.25
        remark<< " including 25% for overtime"
      end
    else
      price_out=price_out*1.5
      remark<< " including 50% for overtime"
    end
    price=price_in+price_out
    [price, remark]
  end

  def evalt
    proforma = Proforma.find(2)
    formulas=""

    formulas << "%s %s" % calcVal(proforma)
    formulas << " vessel %s %s" % [proforma.arrived,proforma.sailed]
    render :text=> formulas

  end

end
