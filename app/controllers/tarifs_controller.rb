class TarifsController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end
 
  # GET /tarifs
  # GET /tarifs.ext_json
  def index
   @tarifs =Tarif.all
    respond_to do |format|
      format.html     # index.html.erb (no data required)
      format.json {render :json => {:successful=>true, :total=>@tarifs.length, :data=> @tarifs }}
    end
  end




  # POST /tarifs
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @tarif = Tarif.new(json_obj)

    if @tarif.save
      render :json => { :success => true, :message => "Created new @Tarif  #{@tarif.id}", :data => @tarif }
    else
      render :json =>{:success =>false, :message=> @tarif.errors}
    end
  end

  # PUT /tarifs/1
  def update
    @tarifs = Tarif.find(params[:id])

    if @tarifs.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "Tarifs was updated", :data => @tarifs }
    else
      render :json =>{:success =>false, :message=> @tarifs.errors}
    end
  end

  # DELETE /tarifs/1
  def destroy
    @tarifs = Tarif.find(params[:id])
     if @tarifs.destroy
      render :json => { :success => true, :message => "Tarifs was deleted"}
    else
      render :json =>{:success =>false, :message=> @tarifs.errors}
    end

  end

end
