require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
IceClassesController.request_forgery_protection_options[:secret] = 'test_secret'

class IceClassesControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_ice_class
    assert_difference('IceClass.count') do
      xhr :post, :create, :format => 'ext_json', :ice_class => { }
    end
    assert_response :success
  end

  def test_should_update_ice_class
    xhr :put, :update, :format => 'ext_json', :id => ice_classes(:one).id, :ice_class => { }
    assert_response :success
  end

  def test_should_destroy_ice_class
    assert_difference('IceClass.count', -1) do
      xhr :delete, :destroy, :id => ice_classes(:one).id
    end
    assert_response :success
  end
end
