require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
ProformasController.request_forgery_protection_options[:secret] = 'test_secret'

class ProformasControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_proforma
    assert_difference('Proforma.count') do
      xhr :post, :create, :format => 'ext_json', :proforma => { }
    end
    assert_response :success
  end

  def test_should_update_proforma
    xhr :put, :update, :format => 'ext_json', :id => proformas(:one).id, :proforma => { }
    assert_response :success
  end

  def test_should_destroy_proforma
    assert_difference('Proforma.count', -1) do
      xhr :delete, :destroy, :id => proformas(:one).id
    end
    assert_response :success
  end
end
