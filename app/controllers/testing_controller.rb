class TestingController < ApplicationController

  def calc(proforma, testVal)
    unless testVal.blank?
      #evaluatedValue= (((proforma.gw * 0.45) /100)*25)
      txt= "evaluatedValue= %s" % testVal
      eval txt
    else
      evaluatedValue=0
    end
    evaluatedValue.to_f

  end

  def mooring(proforma)

    val= case proforma.gw
      when 0..2000 then
        if proforma.vessel.vesel_type == 2 or proforma.vessel.vesel_type == 3
          100
        else
          40
        end
      when 2001..6000 then
        if proforma.vessel.vesel_type == 2 or proforma.vessel.vesel_type == 3
          166
        else
          64
        end
      when 6001..20000 then
        if proforma.vessel.vesel_type == 2 or proforma.vessel.vesel_type == 3
          216
        else
          85
        end
      when 20001..50000 then
        if proforma.vessel.vesel_type == 2 or proforma.vessel.vesel_type == 3
          281
        else
          110
        end
      else
        if proforma.vessel.vesel_type == 2 or proforma.vessel.vesel_type == 3
          331
        else
          129
        end
    end

  end

  def evalt
    proforma = Proforma.find(2)
    formulas=""
    proforma.prof_tarif_calcs.each{ |pct|
      calculatedValue= pct.getCalculatedValue
      formulas<< ("%s %.2f<br/>" % [pct.tarif.name, calculatedValue])
    }
    render :text=> formulas

  end

end
