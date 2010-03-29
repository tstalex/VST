require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
VesselTypesController.request_forgery_protection_options[:secret] = 'test_secret'

class VesselTypesControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_vessel_type
    assert_difference('VesselType.count') do
      xhr :post, :create, :format => 'ext_json', :vessel_type => { }
    end
    assert_response :success
  end

  def test_should_update_vessel_type
    xhr :put, :update, :format => 'ext_json', :id => vessel_types(:one).id, :vessel_type => { }
    assert_response :success
  end

  def test_should_destroy_vessel_type
    assert_difference('VesselType.count', -1) do
      xhr :delete, :destroy, :id => vessel_types(:one).id
    end
    assert_response :success
  end
end
