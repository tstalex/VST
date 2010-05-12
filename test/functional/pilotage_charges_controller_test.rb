require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
PilotageChargesController.request_forgery_protection_options[:secret] = 'test_secret'

class PilotageChargesControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_pilotage_charge
    assert_difference('PilotageCharge.count') do
      xhr :post, :create, :format => 'ext_json', :pilotage_charge => { }
    end
    assert_response :success
  end

  def test_should_update_pilotage_charge
    xhr :put, :update, :format => 'ext_json', :id => pilotage_charges(:one).id, :pilotage_charge => { }
    assert_response :success
  end

  def test_should_destroy_pilotage_charge
    assert_difference('PilotageCharge.count', -1) do
      xhr :delete, :destroy, :id => pilotage_charges(:one).id
    end
    assert_response :success
  end
end
