class <%= controller_class_name %>Controller < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end
 
  # GET /<%= controller_class_name.tableize %>
  # GET /<%= controller_class_name.tableize %>.ext_json
  def index
   @<%= file_name %>s =<%= class_name%>.all
    respond_to do |format|
      format.html     # index.html.erb (no data required)
      format.json {render :json => {:successful=>true, :total=>@<%= file_name %>s.length, :data=> @<%= file_name %>s }}
    end
  end




  # POST /<%= controller_class_name.tableize %>
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @<%= file_name %> = <%= class_name %>.new(json_obj)

    if @<%= file_name %>.save
      render :json => { :success => true, :message => "Created new @<%= class_name %>  #{@<%= file_name %>.id}", :data => @<%= file_name %> }
    else
      render :json =>{:success =>false, :message=> @<%= file_name %>.errors}
    end
  end

  # PUT /<%= controller_class_name.tableize %>/1
  def update
    @<%= controller_class_name.demodulize.tableize %> = <%= class_name %>.find(params[:id])

    if @<%= controller_class_name.demodulize.tableize %>.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "<%= controller_class_name%> was updated", :data => @<%= controller_class_name.demodulize.tableize %> }
    else
      render :json =>{:success =>false, :message=> @<%= controller_class_name.demodulize.tableize %>.errors}
    end

    render :json => @<%= file_name %>.to_ext_json(:success => @<%= file_name %>.update_attributes(params[:<%= file_name %>]))
  end

  # DELETE /<%= controller_class_name.tableize %>/1
  def destroy
    @<%= controller_class_name.demodulize.tableize %> = <%= class_name%>.find(params[:id])
     if @<%= controller_class_name.demodulize.tableize %>.destroy
      render :json => { :success => true, :message => "<%= controller_class_name %> was deleted"}
    else
      render :json =>{:success =>false, :message=> @<%= controller_class_name.demodulize.tableize %>.errors}
    end

  end

end
