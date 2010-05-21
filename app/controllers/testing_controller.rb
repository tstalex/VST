class TestingController < ApplicationController

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

  def lots (proforma)
    pilotGtDiap= PilotageDiapason.find(:first, :conditions => ["? >=pilotage_from and ? <=pilotage_to", proforma.pilotage,proforma.pilotage ],  :order => "pilotage_from")

    if pilotGtDiap.nil?
      pilotGtDiap= PilotageDiapason.last
    end
    pilotCharge= PilotageCharge.find(:first,:conditions => ["diapason_id=? and ? >=gt_from and ? <=gt_to",pilotGtDiap.id,proforma.gw,proforma.gw],:order => "gt_from")
    

    pilotCharge.tarif
  end

  def tonnage(proforma)
    val= case proforma.vessel.vessel_type
      when 6 then  #tanker
        1.66 * proforma.gw
      when 4 then #passenger
        if proforma.vessel.gw<=50000
            0.215 * proforma.vessel.gw
        else
            0.2 * proforma.vessel.gw
        end
      when 8..10 then #cruise ships, yachts and sailing crafts
         if proforma.vessel.gw<=50000
            0.45 * proforma.vessel.gw
        else
            0.4 * proforma.vessel.gw
         end
      
      else

    end
  end

  def waste(proforma)
       val= case proforma.vessel.vessel_type
         when 4 then
          [ (0.010*proforma.gw),"0.010 * GW"]
         when 8 then
          [ (0.018*proforma.gw),"0.018 * GW"]
         when 6 then
          [ (0.020*proforma.gw),"0.020 * GW"]
         else
          [ (0.017*proforma.gw),"0.017 * GW"]
       end
  end

  def mooring(proforma)

    val= case proforma.gw
      when 0..2000 then
        if proforma.vessel.vessel_type == 2 or proforma.vessel.vessel_type == 3
          [200,"100 *2"]
        else
          [40,"40 *2"]
        end
      when 2001..6000 then
        if proforma.vessel.vessel_type == 2 or proforma.vessel.vessel_type == 3
          [166,"166 *2"]
        else
          [64,"64 *2"]
        end
      when 6001..20000 then
        if proforma.vessel.vessel_type == 2 or proforma.vessel.vessel_type == 3
          [216,"216 *2"]
        else
          [85,"85 *2"]
        end
      when 20001..50000 then
        if proforma.vessel.vessel_type == 2 or proforma.vessel.vessel_type == 3
          [281,"281 *2"]
        else
          [110,"110 *2"]
        end
      else
        if proforma.vessel.vessel_type == 2 or proforma.vessel.vessel_type == 3
          [331,"331 *2"]
        else
          [129,"129 *2"]
        end
    end

  end

  def evalt
    proforma = Proforma.find(2)
    formulas=""
    proforma.prof_tarif_calcs.each{ |pct|
      calculatedValue= pct.getCalculatedValue
      dd =Array.new
      dd << pct.tarif.name
      dd= dd + calculatedValue
      formulas << ( "%s - %.2f Remark: %s <br/>" % dd)
    }
    formulas << "<br/>"
    formulas << ("Pilotage charge for %s miles. GT %s -%.2f" % [proforma.pilotage,proforma.gw, lots(proforma)]) 
    render :text=> formulas

  end

end
