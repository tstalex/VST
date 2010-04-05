class TarifsController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end
 
  # GET /tarifs
  # GET /tarifs.ext_json
  def index
    calc= params[:tarif_calculation_id]
    if(calc)
       @tarifs =Tarif.find_all_by_tarif_calculation_id calc
    else
      @tarifs =Tarif.all
    end


    render :json => {:successful=>true, :total=>@tarifs.length, :data=> @tarifs}
  end

  def show
       render :action => "base"
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
