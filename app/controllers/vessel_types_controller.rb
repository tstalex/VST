class VesselTypesController < ApplicationController
  # GET /vessel_types
  # GET /vessel_types.xml
  def index
    @vessel_types = VesselType.all
    render :json =>{:data=>@vessel_types, :success=>true, :total=>@vessel_types.length}
  end

  # POST /vessel_types
  # POST /vessel_types.xml
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @vessel_type=VesselType.new(json_obj)
    if @vessel_type.save
      render :json => { :success => true, :message => "Created new VesselType  #{@vessel_type.id}", :data => @vessel_type }
    else
      render :json =>{:success =>false, :message=> @vessel_type.errors}
    end
  end

  # PUT /vessel_types/1
  # PUT /vessel_types/1.xml
  def update
    @vessel_type = VesselType.find(params[:id])

    if @vessel_type.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "Vessel type was updated", :data => @vessel_type }
    else
      render :json =>{:success =>false, :message=> @vessel_type.errors}
    end
  end

  # DELETE /vessel_types/1
  # DELETE /vessel_types/1.xml
  def destroy
    @vessel_type = VesselType.find(params[:id])

    if @vessel_type.destroy
      render :json => { :success => true, :message => "Vessel type was deleted", :data => @vessel_type }
    else
      render :json =>{:success =>false, :message=> @vessel_type.errors}
    end
  end
end
