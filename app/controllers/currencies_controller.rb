class CurrenciesController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end
 
  # GET /currencies
  # GET /currencies.ext_json
  def index
   @currencys =Currency.all
    render :json => {:successful=>true, :total=>@currencys.length, :data=> @currencys }
  end




  # POST /currencies
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @currency = Currency.new(json_obj)

    if @currency.save
      render :json => { :success => true, :message => "Created new @Currency  #{@currency.id}", :data => @currency }
    else
      render :json =>{:success =>false, :message=> @currency.errors}
    end
  end

  # PUT /currencies/1
  def update
    @currencies = Currency.find(params[:id])

    if @currencies.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "Currencies was updated", :data => @currencies }
    else
      render :json =>{:success =>false, :message=> @currencies.errors}
    end
  end

  # DELETE /currencies/1
  def destroy
    @currencies = Currency.find(params[:id])
     if @currencies.destroy
      render :json => { :success => true, :message => "Currencies was deleted"}
    else
      render :json =>{:success =>false, :message=> @currencies.errors}
    end

  end

end
