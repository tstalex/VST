class LoginController < ApplicationController
 require 'digest/md5'
  @@salt="sd7^3,mc d;Oj c%Xl"
  
   def auth
	
  end
  #GET 
  def index
	logger.info "indx"
  end
  
  # POST login main
  def create
    session[:user]=nil
	login= params[:login]
	password=params[:pwd]
	digest=Digest::MD5.hexdigest(params[:pwd]+@@salt)
	logger.info digest
	user= User.find(:first, :conditions=>["login=?",login])
	if(user.nil?)
		render :json =>{:success =>false, :message=>"Unknown user"}
		return
	else
		if(user.pwd==digest)
			render :json =>{:success =>true, :data=>user,:url=>'/base/show'}
			session[:user]=login
			return
		else
			render :json =>{:success =>false, :message=>"Invalid password"}
			return
		end
	end
	render :json =>{:success =>false, :message=>"Route 51"}
  end
  
  # DELETE /ice_classes/1
  def destroy
	session[:user]=nil
	render :json =>{:success =>true, :data=>"User has been logged off"}
  end
end
