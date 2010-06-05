class LightNaviTarifsController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end
 
  # GET /light_navi_tarifs
  # GET /light_navi_tarifs.ext_json
  def index
   @light_navi_tarifs =LightNaviTarif.all
    respond_to do |format|
      format.html     # index.html.erb (no data required)
      format.json {render :json => {:successful=>true, :total=>@light_navi_tarifs.length, :data=> @light_navi_tarifs }}
    end
  end




  # POST /light_navi_tarifs
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @light_navi_tarif = LightNaviTarif.new(json_obj)

    if @light_navi_tarif.save
      render :json => { :success => true, :message => "Created new @LightNaviTarif  #{@light_navi_tarif.id}", :data => @light_navi_tarif }
    else
      render :json =>{:success =>false, :message=> @light_navi_tarif.errors}
    end
  end

  # PUT /light_navi_tarifs/1
  def update
    @light_navi_tarifs = LightNaviTarif.find(params[:id])

    if @light_navi_tarifs.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "LightNaviTarifs was updated", :data => @light_navi_tarifs }
    else
      render :json =>{:success =>false, :message=> @light_navi_tarifs.errors}
    end
  end

  # DELETE /light_navi_tarifs/1
  def destroy
    @light_navi_tarifs = LightNaviTarif.find(params[:id])
     if @light_navi_tarifs.destroy
      render :json => { :success => true, :message => "LightNaviTarifs was deleted"}
    else
      render :json =>{:success =>false, :message=> @light_navi_tarifs.errors}
    end

  end

end
