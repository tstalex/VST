class PostsController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render :json => { :success => false }, :status => :not_found
  end
 
  # GET /posts
  # GET /posts.ext_json
  def index
   @posts =Post.all
    respond_to do |format|
      format.html     # index.html.erb (no data required)
      format.json {render :json => {:successful=>true, :total=>@posts.length, :data=> @posts }}
    end
  end




  # POST /posts
  def create
    data= params[:data]
    json_obj= ActiveSupport::JSON.decode(data)
    @post = Post.new(json_obj)

    if @post.save
      render :json => { :success => true, :message => "Created new @Post  #{@post.id}", :data => @post }
    else
      render :json =>{:success =>false, :message=> @post.errors}
    end
  end

  # PUT /posts/1
  def update
    @posts = Post.find(params[:id])

    if @posts.update_attributes(ActiveSupport::JSON.decode(params[:data]))
      render :json => { :success => true, :message => "Posts was updated", :data => @posts }
    else
      render :json =>{:success =>false, :message=> @posts.errors}
    end

    render :json => @post.to_ext_json(:success => @post.update_attributes(params[:post]))
  end

  # DELETE /posts/1
  def destroy
    @posts = Post.find(params[:id])
     if @posts.destroy
      render :json => { :success => true, :message => "Posts was deleted"}
    else
      render :json =>{:success =>false, :message=> @posts.errors}
    end

  end

end
