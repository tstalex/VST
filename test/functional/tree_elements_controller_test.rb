require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
TreeElementsController.request_forgery_protection_options[:secret] = 'test_secret'

class TreeElementsControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_tree_element
    assert_difference('TreeElement.count') do
      xhr :post, :create, :format => 'ext_json', :tree_element => { }
    end
    assert_response :success
  end

  def test_should_update_tree_element
    xhr :put, :update, :format => 'ext_json', :id => tree_elements(:one).id, :tree_element => { }
    assert_response :success
  end

  def test_should_destroy_tree_element
    assert_difference('TreeElement.count', -1) do
      xhr :delete, :destroy, :id => tree_elements(:one).id
    end
    assert_response :success
  end
end
