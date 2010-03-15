require 'test_helper'

class VesselTypesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:vessel_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create vessel_type" do
    assert_difference('VesselType.count') do
      post :create, :vessel_type => { }
    end

    assert_redirected_to vessel_type_path(assigns(:vessel_type))
  end

  test "should show vessel_type" do
    get :show, :id => vessel_types(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => vessel_types(:one).to_param
    assert_response :success
  end

  test "should update vessel_type" do
    put :update, :id => vessel_types(:one).to_param, :vessel_type => { }
    assert_redirected_to vessel_type_path(assigns(:vessel_type))
  end

  test "should destroy vessel_type" do
    assert_difference('VesselType.count', -1) do
      delete :destroy, :id => vessel_types(:one).to_param
    end

    assert_redirected_to vessel_types_path
  end
end
