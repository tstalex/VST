class TarifCalculation < ActiveRecord::Base
  has_many :tarifs, :foreign_key => "tarif_calculation_id"
end
