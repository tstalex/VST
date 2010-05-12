class PilotageChargesController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end
 
  # GET /pilotage_charges
  # GET /pilotage_charges.ext_json
  def index
   @pilotage_charges =PilotageCharge.all
    respond_to do |format|
      format.html     # index.html.erb (no data required)
      format.json {render :json => {:successful=>true, :total=>@pilotage_charges.length, :data=> @pilotage_charges }}
    end
  end




  # POST /pilotage_charges
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @pilotage_charge = PilotageCharge.new(json_obj)

    if @pilotage_charge.save
      render :json => { :success => true, :message => "Created new @PilotageCharge  #{@pilotage_charge.id}", :data => @pilotage_charge }
    else
      render :json =>{:success =>false, :message=> @pilotage_charge.errors}
    end
  end

  # PUT /pilotage_charges/1
  def update
    @pilotage_charges = PilotageCharge.find(params[:id])

    if @pilotage_charges.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "PilotageCharges was updated", :data => @pilotage_charges }
    else
      render :json =>{:success =>false, :message=> @pilotage_charges.errors}
    end
  end

  # DELETE /pilotage_charges/1
  def destroy
    @pilotage_charges = PilotageCharge.find(params[:id])
     if @pilotage_charges.destroy
      render :json => { :success => true, :message => "PilotageCharges was deleted"}
    else
      render :json =>{:success =>false, :message=> @pilotage_charges.errors}
    end

  end

end
