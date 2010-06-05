require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
LightNaviTarifsController.request_forgery_protection_options[:secret] = 'test_secret'

class LightNaviTarifsControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_light_navi_tarif
    assert_difference('LightNaviTarif.count') do
      xhr :post, :create, :format => 'ext_json', :light_navi_tarif => { }
    end
    assert_response :success
  end

  def test_should_update_light_navi_tarif
    xhr :put, :update, :format => 'ext_json', :id => light_navi_tarifs(:one).id, :light_navi_tarif => { }
    assert_response :success
  end

  def test_should_destroy_light_navi_tarif
    assert_difference('LightNaviTarif.count', -1) do
      xhr :delete, :destroy, :id => light_navi_tarifs(:one).id
    end
    assert_response :success
  end
end
