class ProfTarifCalc < ActiveRecord::Base
  belongs_to :proforma,   :foreign_key => "proforma_id"
end
