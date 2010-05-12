require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
PilotageDiapasonsController.request_forgery_protection_options[:secret] = 'test_secret'

class PilotageDiapasonsControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_pilotage_diapason
    assert_difference('PilotageDiapason.count') do
      xhr :post, :create, :format => 'ext_json', :pilotage_diapason => { }
    end
    assert_response :success
  end

  def test_should_update_pilotage_diapason
    xhr :put, :update, :format => 'ext_json', :id => pilotage_diapasons(:one).id, :pilotage_diapason => { }
    assert_response :success
  end

  def test_should_destroy_pilotage_diapason
    assert_difference('PilotageDiapason.count', -1) do
      xhr :delete, :destroy, :id => pilotage_diapasons(:one).id
    end
    assert_response :success
  end
end
