class TreeMenuController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound do |exception|
      render :json => { :success => false }, :status => :not_found
    end

    # GET /tree_menu
    def index
      render :json => {:successful=>true, :total=>1 }
    end

end
