require 'test_helper'

class ProformaTest < ActiveSupport::TestCase
  # Replace this with your real tests.
   test "ttt" do
    proforma= Proforma.new
    proforma.pilotage=5
    proforma.arrived=DateTime.civil(2010,5,4,11,20)
    proforma.sailed=DateTime.civil(2010,5,5,11,20)
    proforma.gw=12000
    controller= TestingController.new
    val= controller.lots proforma
    assert val==(4153*2),"Value should be 4153*2"
    end
end
