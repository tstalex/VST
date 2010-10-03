class ProfTarifCalc < ActiveRecord::Base
  belongs_to :proforma, :foreign_key => "proforma_id"
  belongs_to :tarif, :foreign_key => "tarif_id"

  def getCalculatedValue
  
	unless tarif.formula.blank?
	  logger.warn "calculating formula (%s)" % tarif.formula
	  txtFormula= "evaluatedValue= (%s)" % tarif.formula
	  begin
		eval txtFormula
	  rescue 
		raise "Cannot calculate tarif '%s'" % tarif.name
	  end
	else
	  evaluatedValue=[0, "Empty"]
	end
	self.val= "%.2f" % evaluatedValue[0]
	self.description=evaluatedValue[1]
	
	evaluatedValue
  end

end
