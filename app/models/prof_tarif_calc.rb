class ProfTarifCalc < ActiveRecord::Base
  belongs_to :proforma,   :foreign_key => "proforma_id"
  belongs_to :tarif,   :foreign_key => "tarif_id"

  def getCalculatedValue
    logger.info "Proforma %s" %proforma
    unless tarif.formula.blank?
      logger.warn "calculating formula (%s)" % tarif.formula
      txtFormula= "evaluatedValue= (%s)" % tarif.formula
      eval txtFormula
    else
      evaluatedValue=[0,"Empty"]
    end
    evaluatedValue
  end

end
