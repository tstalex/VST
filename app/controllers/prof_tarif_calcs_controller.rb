class ProfTarifCalcsController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end

  # GET /prof_tarif_calcs
  # GET /prof_tarif_calcs.ext_json
  def index
    if params[:proforma_id]
      prof_id= params[:proforma_id]
    else
      prof_id = -1
    end

    @prof_tarif_calcs =ProfTarifCalc.find_all_by_proforma_id prof_id
    render :json => {:successful=>true, :total=>@prof_tarif_calcs.length, :data=> @prof_tarif_calcs }
  end

  # GET /gen_tarifs
  def gen_tarifs
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    prof =Proforma.new json_obj
    logger.debug "calculating for port %s" % json_obj["port_id"]
    port= Port.find(json_obj["port_id"])
    profCalc=Array.new
    if port
      tarifs= port.tarifs
    else
      tarifs= []
    end
    tarifs.each{|t|
      if(t.is_manual)
        next  
      end

      calc= ProfTarifCalc.new
      calc.proforma=prof
      calc.tarif_id=t.id
      generated_value=calc.getCalculatedValue
      profCalc.push calc}
    
  render :json => { :success => true, :data => profCalc }

end

# POST /prof_tarif_calcs
def create
  data= params[:data]
  json_obj= ActiveSupport::JSON.decode(data)
  @prof_tarif_calc = ProfTarifCalc.new(json_obj)

  if @prof_tarif_calc.save
    render :json => { :success => true, :message => "Created new @ProfTarifCalc  #{@prof_tarif_calc.id}", :data => @prof_tarif_calc }
  else
    render :json =>{:success =>false, :message=> @prof_tarif_calc.errors}
  end
end

# PUT /prof_tarif_calcs/1
def update
  @prof_tarif_calcs = ProfTarifCalc.find(params[:id])

  if @prof_tarif_calcs.update_attributes(ActiveSupport::JSON.decode(params[:data]))
    render :json => { :success => true, :message => "ProfTarifCalcs was updated", :data => @prof_tarif_calcs }
  else
    render :json =>{:success =>false, :message=> @prof_tarif_calcs.errors}
  end
end

# DELETE /prof_tarif_calcs/1
def destroy
  @prof_tarif_calcs = ProfTarifCalc.find(params[:id])
  if @prof_tarif_calcs.destroy
    render :json => { :success => true, :message => "ProfTarifCalcs was deleted"}
  else
    render :json =>{:success =>false, :message=> @prof_tarif_calcs.errors}
  end

end

end
