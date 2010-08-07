require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
EntitiesController.request_forgery_protection_options[:secret] = 'test_secret'

class EntitiesControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_entity
    assert_difference('Entity.count') do
      xhr :post, :create, :format => 'ext_json', :entity => { }
    end
    assert_response :success
  end

  def test_should_update_entity
    xhr :put, :update, :format => 'ext_json', :id => entities(:one).id, :entity => { }
    assert_response :success
  end

  def test_should_destroy_entity
    assert_difference('Entity.count', -1) do
      xhr :delete, :destroy, :id => entities(:one).id
    end
    assert_response :success
  end
end
