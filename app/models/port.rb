class Port < ActiveRecord::Base
 # belongs_to:country

  def tarifs
    tc= TarifCalculation.last(:conditions => [ "port_id = ?", id])
    if tc
       tc.tarifs
    else
      Array.new
    end
  end
end
