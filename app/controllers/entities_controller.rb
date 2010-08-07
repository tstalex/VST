class EntitiesController < ApplicationController
  include EntitiesHelper
  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end

  # GET /entities
  # GET /entities.ext_json
  def index
   @entitys =Entity.all
   ret= get_tree @entitys
    render :json => {:successful=>true, :total=> (ret.blank?)? 0:1 , :data=> @ret }
  end




  # POST /entities
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @entity = Entity.new(json_obj)

    if @entity.save
      render :json => { :success => true, :message => "Created new @Entity  #{@entity.id}", :data => @entity }
    else
      render :json =>{:success =>false, :message=> @entity.errors}
    end
  end

  # PUT /entities/1
  def update
    @entities = Entity.find(params[:id])

    if @entities.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "Entities was updated", :data => @entities }
    else
      render :json =>{:success =>false, :message=> @entities.errors}
    end
  end

  # DELETE /entities/1
  def destroy
    @entities = Entity.find(params[:id])
     if @entities.destroy
      render :json => { :success => true, :message => "Entities was deleted"}
    else
      render :json =>{:success =>false, :message=> @entities.errors}
    end

  end

end
