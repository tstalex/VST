class ProformasController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end

  def convertTarifCalcs
    if params[:tarifs].nil?
      Array.new
      return
    end
    data= params[:tarifs]
    json_obj= ActiveSupport::JSON.decode(data)
    tarifs=Array.new
    json_obj.each{|el|

      profCalc=  ProfTarifCalc.new
      profCalc.tarif_id=el["tarif_id"]
      profCalc.val=el["val"]
      tarifs << profCalc
    }
    tarifs

  end

  # GET /proformas
  # GET /proformas.ext_json
  def index
    @proformas =Proforma.all
    render :json => {:successful=>true, :total=>@proformas.length, :data=> @proformas }
  end

  # POST /proformas
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @proforma = Proforma.new(json_obj)
    @proforma.prof_tarif_calcs= convertTarifCalcs
    if @proforma.save
      render :json => { :success => true, :message => "Created new @Proforma  #{@proforma.id}", :data => @proforma }
    else
      render :json =>{:success =>false, :message=> @proforma.errors}
    end
  end

  # PUT /proformas/1
  def update
    @proforma = Proforma.find(params[:id])
    logger.info @proforma.prof_tarif_calcs.nil?
    @proforma.prof_tarif_calcs << convertTarifCalcs
    if @proforma.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "Proformas was updated", :data => @proforma }
    else
      render :json =>{:success =>false, :message=> @proforma.errors}
    end
  end

  # DELETE /proformas/1
  def destroy
    @proformas = Proforma.find(params[:id])
    if @proformas.destroy
      render :json => { :success => true, :message => "Proformas was deleted"}
    else
      render :json =>{:success =>false, :message=> @proformas.errors}
    end

  end

end
