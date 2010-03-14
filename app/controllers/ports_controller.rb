class PortsController < ApplicationController
  # GET /ports
  # GET /ports.xml
  def index
    @ports = Port.all
    total= @ports.empty? ? 0: @ports.length

    render :json => {:successful=>true, :total=>@ports.length, :data=> @ports }
  end

  # GET /ports/1
  # GET /ports/1.xml
  def show
    @port = Port.find(params[:id])
    render :json => {:successful=>true, :data=> @port }
  end

  # POST /ports
  # POST /ports.xml
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @port = Port.new(json_obj)

    if @port.save
      render :json => { :success => true, :message => "Created new Port  #{@port.id}", :data => @port }
    else
      render :json =>{:success =>false, :message=> @port.errors}
    end
  end

  # PUT /ports/1
  # PUT /ports/1.xml
  def update
    @port = Port.find(params[:id])

    if @port.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "Port was updated", :data => @port }
    else
      render :json =>{:success =>false, :message=> @port.errors}
    end
  end

  # DELETE /ports/1
  # DELETE /ports/1.xml
  def destroy
    @port = Port.find(params[:id])
    if @port.destroy
      render :json => { :success => true, :message => "Port was deleted"}
    else
      render :json =>{:success =>false, :message=> @port.errors}
    end
  end
end
