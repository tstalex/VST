class TarifCalculationsController < ApplicationController
  # GET /tarif_calculations
  # GET /tarif_calculations.xml
  def index
    @tarif_calculations = TarifCalculation.all
    render :json => {:data =>@tarif_calculations }
  end

  # GET /tarif_calculations/1
  # GET /tarif_calculations/1.xml
  def show
    @tarif_calculation = TarifCalculation.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @tarif_calculation }
    end
  end

  # POST /tarif_calculations
  # POST /tarif_calculations.xml
  def create
    data= params[:data]
    jsonObj= ActiveSupport::JSON.decode(data)
    @tarif_calculation = TarifCalculation.new(jsonObj)
     if @tarif_calculation.save
      render :json => { :success => true, :message => "Created new TarifCalculation  #{@tarif_calculation.id}", :data => @tarif_calculation }
     else
      render :json => { :message => "Failed to create object"}
     end
  end

  # PUT /tarif_calculations/1
  # PUT /tarif_calculations/1.xml
  def update
    @tarif_calculation = TarifCalculation.find(params[:id])
      if @tarif_calculation.update_attributes(ActiveSupport::JSON.decode(params[:data]))
        render :json =>{:success =>true, :message=> 'TarifCalculation was successfully updated.'}
      else
        render :json =>{:success =>false, :message=> @tarif_calculation.errors}
      end
  end

  # DELETE /tarif_calculations/1
  # DELETE /tarif_calculations/1.xml
  def destroy
    @tarif_calculation = TarifCalculation.find(params[:id])
    @tarif_calculation.destroy

    render :json =>{:success =>true, :message=> 'TarifCalculation was successfully deleted.'}
  end
end
