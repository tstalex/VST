class Proforma < ActiveRecord::Base
  has_many :prof_tarif_calcs, :foreign_key => "proforma_id",:include => true

  def to_json(options = nil)
    ActiveSupport::JSON.encode(as_json(options))
  end
end
