class VesselsController < ApplicationController
  # GET /vessels
  # GET /vessels.xml
  def index
    @vessels = Vessel.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @vessels }
    end
  end

  # GET /vessels/1
  # GET /vessels/1.xml
  def show
    @vessel = Vessel.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @vessel }
    end
  end

  # GET /vessels/new
  # GET /vessels/new.xml
  def new
    @vessel = Vessel.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @vessel }
    end
  end

  # GET /vessels/1/edit
  def edit
    @vessel = Vessel.find(params[:id])
  end

  # POST /vessels
  # POST /vessels.xml
  def create
    @vessel = Vessel.new(params[:vessel])

    respond_to do |format|
      if @vessel.save
        flash[:notice] = 'Vessel was successfully created.'
        format.html { redirect_to(@vessel) }
        format.xml  { render :xml => @vessel, :status => :created, :location => @vessel }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @vessel.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /vessels/1
  # PUT /vessels/1.xml
  def update
    @vessel = Vessel.find(params[:id])

    respond_to do |format|
      if @vessel.update_attributes(params[:vessel])
        flash[:notice] = 'Vessel was successfully updated.'
        format.html { redirect_to(@vessel) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @vessel.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /vessels/1
  # DELETE /vessels/1.xml
  def destroy
    @vessel = Vessel.find(params[:id])
    @vessel.destroy

    respond_to do |format|
      format.html { redirect_to(vessels_url) }
      format.xml  { head :ok }
    end
  end
end
