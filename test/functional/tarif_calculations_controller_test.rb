require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
TarifCalculationsController.request_forgery_protection_options[:secret] = 'test_secret'

class TarifCalculationsControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_tarif_calculation
    assert_difference('TarifCalculation.count') do
      xhr :post, :create, :format => 'ext_json', :tarif_calculation => { }
    end
    assert_response :success
  end

  def test_should_update_tarif_calculation
    xhr :put, :update, :format => 'ext_json', :id => tarif_calculations(:one).id, :tarif_calculation => { }
    assert_response :success
  end

  def test_should_destroy_tarif_calculation
    assert_difference('TarifCalculation.count', -1) do
      xhr :delete, :destroy, :id => tarif_calculations(:one).id
    end
    assert_response :success
  end
end
