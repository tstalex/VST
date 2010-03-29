class IceClassesController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end

  # GET /ice_classes
  # GET /ice_classes.ext_json
  def index
    @ice_classs =IceClass.all
    render :json => {:successful=>true, :total=>@ice_classs.length, :data=> @ice_classs }
  end

         
  # POST /ice_classes
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @ice_class = IceClass.new(json_obj)

    if @ice_class.save
      render :json => { :success => true, :message => "Created new @IceClass  #{@ice_class.id}", :data => @ice_class }
    else
      render :json =>{:success =>false, :message=> @ice_class.errors}
    end
  end

  # PUT /ice_classes/1
  def update
    @ice_classes = IceClass.find(params[:id])

    if @ice_classes.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "IceClasses was updated", :data => @ice_classes }
    else
      render :json =>{:success =>false, :message=> @ice_classes.errors}
    end

    render :json => @ice_class.to_ext_json(:success => @ice_class.update_attributes(params[:ice_class]))
  end

  # DELETE /ice_classes/1
  def destroy
    @ice_classes = IceClass.find(params[:id])
    if @ice_classes.destroy
      render :json => { :success => true, :message => "IceClasses was deleted"}
    else
      render :json =>{:success =>false, :message=> @ice_classes.errors}
    end

  end

end
