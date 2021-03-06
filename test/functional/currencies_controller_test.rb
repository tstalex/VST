require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
CurrenciesController.request_forgery_protection_options[:secret] = 'test_secret'

class CurrenciesControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_currency
    assert_difference('Currency.count') do
      xhr :post, :create, :format => 'ext_json', :currency => { }
    end
    assert_response :success
  end

  def test_should_update_currency
    xhr :put, :update, :format => 'ext_json', :id => currencies(:one).id, :currency => { }
    assert_response :success
  end

  def test_should_destroy_currency
    assert_difference('Currency.count', -1) do
      xhr :delete, :destroy, :id => currencies(:one).id
    end
    assert_response :success
  end
end
