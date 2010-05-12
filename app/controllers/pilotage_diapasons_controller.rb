class PilotageDiapasonsController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end
 
  # GET /pilotage_diapasons
  # GET /pilotage_diapasons.ext_json
  def index
   @pilotage_diapasons =PilotageDiapason.all
    respond_to do |format|
      format.html     # index.html.erb (no data required)
      format.json {render :json => {:successful=>true, :total=>@pilotage_diapasons.length, :data=> @pilotage_diapasons }}
    end
  end




  # POST /pilotage_diapasons
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @pilotage_diapason = PilotageDiapason.new(json_obj)

    if @pilotage_diapason.save
      render :json => { :success => true, :message => "Created new @PilotageDiapason  #{@pilotage_diapason.id}", :data => @pilotage_diapason }
    else
      render :json =>{:success =>false, :message=> @pilotage_diapason.errors}
    end
  end

  # PUT /pilotage_diapasons/1
  def update
    @pilotage_diapasons = PilotageDiapason.find(params[:id])

    if @pilotage_diapasons.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "PilotageDiapasons was updated", :data => @pilotage_diapasons }
    else
      render :json =>{:success =>false, :message=> @pilotage_diapasons.errors}
    end
  end

  # DELETE /pilotage_diapasons/1
  def destroy
    @pilotage_diapasons = PilotageDiapason.find(params[:id])
     if @pilotage_diapasons.destroy
      render :json => { :success => true, :message => "PilotageDiapasons was deleted"}
    else
      render :json =>{:success =>false, :message=> @pilotage_diapasons.errors}
    end

  end

end
