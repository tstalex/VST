require File.dirname(__FILE__) + '/../test_helper'

# make sure the secret for request forgery protection is set (views will
# explicitly use the form_authenticity_token method which will fail otherwise)
ProfTarifCalcsController.request_forgery_protection_options[:secret] = 'test_secret'

class ProfTarifCalcsControllerTest < ActionController::TestCase


  def test_should_get_index
    get :index
    assert_response :success
    get :index, :format => 'ext_json'
    assert_response :success
  end

  def test_should_create_prof_tarif_calc
    assert_difference('ProfTarifCalc.count') do
      xhr :post, :create, :format => 'ext_json', :prof_tarif_calc => { }
    end
    assert_response :success
  end

  def test_should_update_prof_tarif_calc
    xhr :put, :update, :format => 'ext_json', :id => prof_tarif_calcs(:one).id, :prof_tarif_calc => { }
    assert_response :success
  end

  def test_should_destroy_prof_tarif_calc
    assert_difference('ProfTarifCalc.count', -1) do
      xhr :delete, :destroy, :id => prof_tarif_calcs(:one).id
    end
    assert_response :success
  end
end
