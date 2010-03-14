class CreateTarifs < ActiveRecord::Migration
#  extends MigrationHelpers
  def self.up
    create_table :tarifs do |t|
      t.integer :tarif_calculation_id,    :null => false
      t.string :name
      t.decimail :tarif_value
      t.timestamps
    end
 #   fk :tarifs, :tarif_calculation_id, :tarif_calculations
  end

  def self.down
     drop_fk :tarif_calculation_id, :order_id
     drop_table :tarifs
  end
end
