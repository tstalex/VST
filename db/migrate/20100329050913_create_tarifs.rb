class CreateTarifs < ActiveRecord::Migration
  def self.up
    create_table :tarifs do |t|
      t.integer :tarif_calculation_id
      t.string :name
      t.string :formula
      t.boolean :is_manual
      
      t.timestamps
    end
  end

  def self.down
    drop_table :tarifs
  end
end
