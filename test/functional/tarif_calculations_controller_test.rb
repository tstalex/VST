require 'test_helper'

class TarifCalculationsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tarif_calculations)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create tarif_calculation" do
    assert_difference('TarifCalculation.count') do
      post :create, :tarif_calculation => { }
    end

    assert_redirected_to tarif_calculation_path(assigns(:tarif_calculation))
  end

  test "should show tarif_calculation" do
    get :show, :id => tarif_calculations(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => tarif_calculations(:one).to_param
    assert_response :success
  end

  test "should update tarif_calculation" do
    put :update, :id => tarif_calculations(:one).to_param, :tarif_calculation => { }
    assert_redirected_to tarif_calculation_path(assigns(:tarif_calculation))
  end

  test "should destroy tarif_calculation" do
    assert_difference('TarifCalculation.count', -1) do
      delete :destroy, :id => tarif_calculations(:one).to_param
    end

    assert_redirected_to tarif_calculations_path
  end
end
