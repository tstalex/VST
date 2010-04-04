class TarifCalculationsController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end
 
  # GET /tarif_calculations
  # GET /tarif_calculations.ext_json
  def index
    port_id=params[:port_id]
    if(port_id)
      @tarif_calculations =TarifCalculation.find_all_by_port_id(port_id)
    else
      @tarif_calculations =TarifCalculation.all
    end

   render :json => {:successful=>true, :total=>@tarif_calculations.length, :data=> @tarif_calculations }
  end




  # POST /tarif_calculations
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @tarif_calculation = TarifCalculation.new(json_obj)

    if @tarif_calculation.save
      render :json => { :success => true, :message => "Created new @TarifCalculation  #{@tarif_calculation.id}", :data => @tarif_calculation }
    else
      render :json =>{:success =>false, :message=> @tarif_calculation.errors}
    end
  end

  # PUT /tarif_calculations/1
  def update
    @tarif_calculations = TarifCalculation.find(params[:id])

    if @tarif_calculations.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "TarifCalculations was updated", :data => @tarif_calculations }
    else
      render :json =>{:success =>false, :message=> @tarif_calculations.errors}
    end
  end

  # DELETE /tarif_calculations/1
  def destroy
    @tarif_calculations = TarifCalculation.find(params[:id])
     if @tarif_calculations.destroy
      render :json => { :success => true, :message => "TarifCalculations was deleted"}
    else
      render :json =>{:success =>false, :message=> @tarif_calculations.errors}
    end

  end

end
