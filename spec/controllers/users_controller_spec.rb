require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe UsersController do
  describe "handling GET /users" do

    before(:each) do
      @user = mock_model(User)
      User.stub!(:find).and_return([@user])
    end

    def do_get
      get :index
    end

    it "should be successful" do
      do_get
      response.should be_success
    end

    it "should render index template" do
      do_get
      response.should render_template('index')
    end

    it "should find all users" do
      User.should_receive(:find).with(:all, anything()).and_return([@user])
      do_get
    end
    it "should assign the found users for the view" do
      do_get
      assigns[:users].should == [@user]
    end
  end

  describe "handling POST /users" do

    before(:each) do
      @user = mock_model(User, :to_param => "1")
      User.stub!(:new).and_return(@user)
    end
    describe "with successful save" do
      def do_post
        @user.should_receive(:to_ext_json)
        @user.should_receive(:save).and_return(true)
        post :create, :user => {}
      end
      it "should create a new user" do
        User.should_receive(:new).with({}).and_return(@user)
        do_post
      end

    end
    describe "with failed save" do

      def do_post
        @user.should_receive(:to_ext_json)
        @user.should_receive(:save).and_return(false)
        post :create, :user => {}
      end

      it "should fail" do
        do_post
      end
    end
  end

  describe "handling PUT /users/1" do

    before(:each) do
      @user = mock_model(User, :to_param => "1")
      User.stub!(:find).and_return(@user)
    end
    describe "with successful update" do

      def do_put
        @user.should_receive(:to_ext_json)
        @user.should_receive(:update_attributes).and_return(true)
        put :update, :id => "1"
      end

      it "should find the user requested" do
        User.should_receive(:find).with("1").and_return(@user)
        do_put
      end

      it "should update the found user" do
        do_put
        assigns(:user).should equal(@user)
      end

      it "should assign the found user for the view" do
        do_put
        assigns(:user).should equal(@user)
      end

    end
    describe "with failed update" do

      def do_put
        @user.should_receive(:to_ext_json)
        @user.should_receive(:update_attributes).and_return(false)
        put :update, :id => "1"
      end

      it "should fail" do
        do_put
      end

    end
  end

  describe "handling DELETE /users/1" do

    before(:each) do
      @user = mock_model(User, :destroy => true)
      User.stub!(:find).and_return(@user)
    end
    def do_delete
      delete :destroy, :id => "1"
    end

    it "should find the user requested" do
      User.should_receive(:find).with("1").and_return(@user)
      do_delete
    end
    it "should call destroy on the found user" do
      @user.should_receive(:destroy).and_return(true)
      do_delete
    end
    it "should redirect to the users list" do
      do_delete
    end
  end
end