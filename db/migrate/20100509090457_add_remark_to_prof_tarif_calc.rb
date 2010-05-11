class AddRemarkToProfTarifCalc < ActiveRecord::Migration
  def self.up
    add_column :prof_tarif_calcs, :remark, :string
  end

  def self.down
    remove_column :prof_tarif_calcs, :remark
  end
end
