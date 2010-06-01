require 'test_helper'

class TestTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "regular" do
    proforma= Proforma.new
    proforma.pilotage=5
    proforma.arrived=DateTime.civil(2010,5,4,11,20)
    proforma.sailed=DateTime.civil(2010,5,5,11,20)
    proforma.gw=12000
    controller= TestingController.new
    val= controller.lots proforma
    assert val==(4153*2),"Value should be 4153*2"
    end
  test "overtime" do
    proforma= Proforma.new
    proforma.pilotage=5
    proforma.arrived=DateTime.civil(2010,5,4,18,20)
    proforma.sailed=DateTime.civil(2010,5,5,11,20)
    proforma.gw=12000
    controller= TestingController.new
    val= controller.lots proforma
    assert val==( (4153*1.25)+4153),"Value should be 4153*1.25)+4153"

    proforma= Proforma.new
    proforma.pilotage=5
    proforma.arrived=DateTime.civil(2010,5,4,17,20)
    proforma.sailed=DateTime.civil(2010,5,5,5,20)
    proforma.gw=12000
    controller= TestingController.new
    val= controller.lots proforma
    assert val==( (4153*1.25)+4153),"Value should be 4153*1.25)+4153"

  end
  test "holiday" do
    proforma= Proforma.new
    proforma.pilotage=5
    proforma.arrived=DateTime.civil(2010,1,1,11,20)
    proforma.sailed=DateTime.civil(2010,5,5,11,20)
    proforma.gw=12000
    controller= TestingController.new
    val= controller.lots proforma
    assert val==( (4153*1.5)+4153),"Value should be 4153*1.5)+4153"
  end

end
