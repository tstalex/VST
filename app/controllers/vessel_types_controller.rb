class VesselTypesController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end
 
  # GET /vessel_types
  # GET /vessel_types.ext_json
  def index
   @vessel_types =VesselType.all
    respond_to do |format|
      format.json {render :json => {:successful=>true, :total=>@vessel_types.length, :data=> @vessel_types }}
    end
  end




  # POST /vessel_types
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @vessel_type = VesselType.new(json_obj)

    if @vessel_type.save
      render :json => { :success => true, :message => "Created new @VesselType  #{@vessel_type.id}", :data => @vessel_type }
    else
      render :json =>{:success =>false, :message=> @vessel_type.errors}
    end
  end

  # PUT /vessel_types/1
  def update
    @vessel_types = VesselType.find(params[:id])

    if @vessel_types.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "VesselTypes was updated", :data => @vessel_types }
    else
      render :json =>{:success =>false, :message=> @vessel_types.errors}
    end

    render :json => @vessel_type.to_ext_json(:success => @vessel_type.update_attributes(params[:vessel_type]))
  end

  # DELETE /vessel_types/1
  def destroy
    @vessel_types = VesselType.find(params[:id])
     if @vessel_types.destroy
      render :json => { :success => true, :message => "VesselTypes was deleted"}
    else
      render :json =>{:success =>false, :message=> @vessel_types.errors}
    end

  end

end
