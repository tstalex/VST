class AddDescriptionToProftarifCalsc < ActiveRecord::Migration
  def self.up
    add_column :prof_tarif_calcs, :description, :string , :null => false
  end

  def self.down
    remove_column :prof_tarif_calcs, :description
  end
end
