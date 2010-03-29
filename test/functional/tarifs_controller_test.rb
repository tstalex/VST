require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
TarifsController.request_forgery_protection_options[:secret] = 'test_secret'

class TarifsControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_tarif
    assert_difference('Tarif.count') do
      xhr :post, :create, :format => 'ext_json', :tarif => { }
    end
    assert_response :success
  end

  def test_should_update_tarif
    xhr :put, :update, :format => 'ext_json', :id => tarifs(:one).id, :tarif => { }
    assert_response :success
  end

  def test_should_destroy_tarif
    assert_difference('Tarif.count', -1) do
      xhr :delete, :destroy, :id => tarifs(:one).id
    end
    assert_response :success
  end
end
