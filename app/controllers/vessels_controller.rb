class VesselsController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end
 
  # GET /vessels
  # GET /vessels.ext_json
  def index
   @vessels =Vessel.all
   # respond_to do |format|
   #   format.html     # index.html.erb (no data required)
      render :json => {:successful=>true, :total=>@vessels.length, :data=> @vessels }
   # end
  end




  # POST /vessels
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @vessel = Vessel.new(json_obj)

    if @vessel.save
      render :json => { :success => true, :message => "Created new @Vessel  #{@vessel.id}", :data => @vessel }
    else
      render :json =>{:success =>false, :message=> @vessel.errors}
    end
  end

  # PUT /vessels/1
  def update
    @vessels = Vessel.find(params[:id])

    if @vessels.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "Vessels was updated", :data => @vessels }
    else
      render :json =>{:success =>false, :message=> @vessels.errors}
    end
  end

  # DELETE /vessels/1
  def destroy
    @vessels = Vessel.find(params[:id])
     if @vessels.destroy
      render :json => { :success => true, :message => "Vessels was deleted"}
    else
      render :json =>{:success =>false, :message=> @vessels.errors}
    end

  end

end
