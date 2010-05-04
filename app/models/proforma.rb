class Proforma < ActiveRecord::Base
  has_many :prof_tarif_calcs, :foreign_key => "proforma_id",:include => true
  belongs_to :vessel#, :foreign_key => "vessel_id",:include => true

end
