require 'test_helper'

class OviesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:ovies)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create ovie" do
    assert_difference('Ovie.count') do
      post :create, :ovie => { }
    end

    assert_redirected_to ovie_path(assigns(:ovie))
  end

  test "should show ovie" do
    get :show, :id => ovies(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => ovies(:one).to_param
    assert_response :success
  end

  test "should update ovie" do
    put :update, :id => ovies(:one).to_param, :ovie => { }
    assert_redirected_to ovie_path(assigns(:ovie))
  end

  test "should destroy ovie" do
    assert_difference('Ovie.count', -1) do
      delete :destroy, :id => ovies(:one).to_param
    end

    assert_redirected_to ovies_path
  end
end
