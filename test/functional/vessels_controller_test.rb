require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
VesselsController.request_forgery_protection_options[:secret] = 'test_secret'

class VesselsControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_vessel
    assert_difference('Vessel.count') do
      xhr :post, :create, :format => 'ext_json', :vessel => { }
    end
    assert_response :success
  end

  def test_should_update_vessel
    xhr :put, :update, :format => 'ext_json', :id => vessels(:one).id, :vessel => { }
    assert_response :success
  end

  def test_should_destroy_vessel
    assert_difference('Vessel.count', -1) do
      xhr :delete, :destroy, :id => vessels(:one).id
    end
    assert_response :success
  end
end
