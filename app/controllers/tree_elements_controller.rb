class TreeElementsController < ApplicationController
  include TreeElementsHelper
  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => {:success => false}, :status => :not_found
  end

  # GET /tree_elements
  # GET /tree_elements.ext_json
  def index
    @tree_elements =TreeElement.all
    ret= get_tree @tree_elements
    render :json => ret

  end


  # POST /tree_elements
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @tree_element = TreeElement.new(json_obj)

    if @tree_element.save
      render :json => {:success => true, :message => "Created new @TreeElement  #{@tree_element.id}", :data => @tree_element}
    else
      render :json =>{:success =>false, :message=> @tree_element.errors}
    end
  end

  # PUT /tree_elements/1
  def update
    @tree_elements = TreeElement.find(params[:id])

    if @tree_elements.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => {:success => true, :message => "TreeElements was updated", :data => @tree_elements}
    else
      render :json =>{:success =>false, :message=> @tree_elements.errors}
    end
  end

  # DELETE /tree_elements/1
  def destroy
    @tree_elements = TreeElement.find(params[:id])
    if @tree_elements.destroy
      render :json => {:success => true, :message => "TreeElements was deleted"}
    else
      render :json =>{:success =>false, :message=> @tree_elements.errors}
    end

  end

end
