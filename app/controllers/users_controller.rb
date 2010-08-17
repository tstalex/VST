class UsersController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end
 
  # GET /users
  # GET /users.ext_json
  def index
   @users =User.all
    respond_to do |format|
      format.html     # index.html.erb (no data required)
      format.json {render :json => {:successful=>true, :total=>@users.length, :data=> @users }}
    end
  end




  # POST /users
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @user = User.new(json_obj)

    if @user.save
      render :json => { :success => true, :message => "Created new @User  #{@user.id}", :data => @user }
    else
      render :json =>{:success =>false, :message=> @user.errors}
    end
  end

  # PUT /users/1
  def update
    @users = User.find(params[:id])

    if @users.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "Users was updated", :data => @users }
    else
      render :json =>{:success =>false, :message=> @users.errors}
    end
  end

  # DELETE /users/1
  def destroy
    @users = User.find(params[:id])
     if @users.destroy
      render :json => { :success => true, :message => "Users was deleted"}
    else
      render :json =>{:success =>false, :message=> @users.errors}
    end

  end

end
