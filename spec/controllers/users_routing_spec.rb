require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe UsersController do
  describe "route generation" do

    it "should map { :controller => 'users', :action => 'index' } to /users" do
      route_for(:controller => "users", :action => "index").should == "/users"
    end

    it "should map { :controller => 'users', :action => 'update', :id => 1} to /users/1" do
      route_for(:controller => "users", :action => "update", :id => 1).should == "/users/1"
    end

    it "should map { :controller => 'users', :action => 'destroy', :id => 1} to /users/1" do
      route_for(:controller => "users", :action => "destroy", :id => 1).should == "/users/1"
    end
  end

  describe "route recognition" do

    it "should generate params { :controller => 'users', action => 'index' } from GET /users" do
      params_from(:get, "/users").should == {:controller => "users", :action => "index"}
    end

    it "should generate params { :controller => 'users', action => 'create' } from POST /users" do
      params_from(:post, "/users").should == {:controller => "users", :action => "create"}
    end

    it "should generate params { :controller => 'users', action => 'update', id => '1' } from PUT /users/1" do
      params_from(:put, "/users/1").should == {:controller => "users", :action => "update", :id => "1"}
    end

    it "should generate params { :controller => 'users', action => 'destroy', id => '1' } from DELETE /users/1" do
      params_from(:delete, "/users/1").should == {:controller => "users", :action => "destroy", :id => "1"}
    end
  end
end