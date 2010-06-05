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

  def calcLh (proforma)
    ret=0
    remark=""
    ln= LightNaviTarif.find(:first, :conditions => [ ":u >=gt_from and :u<=gt_to ", { :u => proforma.gw }])
    ret=ln.lighthouse

    if proforma.vssel.vessel_flag.is_euro==1
      ret= ret * 0.75
      remark << " incl. 25% rebate"
    end
    unless (["PAS","CRU","CCR"].index( proforma.vessel.type.code).nil?)
      ret= ret * 0.6
      remark << " incl. 40% rebate"
    end
    unless (["PAS","CRU","CCR"].index( proforma.vessel.type.code).nil?)
      ret= ret * 0.6
      remark << " incl. 40% rebate"
    end
    

    [ret, remark]
  end

  def calcVal (proforma)
    ret=0
    remark=""
    case proforma.vessel.type.code
      when "TAN" then #tankers
        ret= proforma.gw * 1.66
        remark = "GT * 1.66"
      when "PAS" then #passenger ships
        ret= proforma.gw *  ((proforma.gw < 30000) ? 0.215 : 0.2)
        remark = "GT * %s" % ((proforma.gw < 30000) ? "0.215" : "0.2")

        #discounts
        case proforma.calls
          when 31...150 then
            ret= ret * 0.8 #20%
            remark << " 20% rebate"
          when 151...240 then
            ret= ret * 0.6 #40%
          remark << " 40% rebate"
          when 241 ... 10000 then
            ret= ret * 0.3 #70%
          remark << " 70% rebate"
        end
      when "CRU" then #cruise ships, yachts and sailing crafts
        ret= proforma.gw * ((proforma.gw < 50000) ? 0.415 : 0.4)
        remark = "GT * %s" % ((proforma.gw < 50000) ? "0.415" : "0.4")
        #Starting from January 1 st 2011: cruise ships, yachts and sailing crafts 0,46 EUR/GT unit
        if (proforma.arrived > Date.civil(2010, 12, 31))
          ret= proforma.gw * 0.46
          remark = "GT * 0.46"
        end
        #discounts
        case proforma.calls
          when 2 then
            ret=ret * 0.5 #50%
            remark << " 50% rebate"
          when 4 then
            ret=ret * 0.25 #75%
            remark << " 75% rebate"
          when 6 ...100000 then
            ret=ret * 0.15 #85%
            remark << " 85% rebate"
        end
      when "CCR" then #coastal cruisers
        ret= proforma.gw * 0.2
        remark = "GT * 0.2"
      else #all others
        ret=proforma.gw * 0.735
        remark = "GT * 0.735"
    end
    [ret, remark]
  end

  def evalt
    proforma = Proforma.find(2)
    formulas=""

    formulas << "%s %s" % calcLh(proforma)
    formulas << " vessel %s" % proforma.gw
    render :text=> formulas

  end

end
