class CreateTarifCalculations < ActiveRecord::Migration
  def self.up
    create_table :tarif_calculations do |t|
      t.date :from
      t.date :to
      t.boolean :active
      t.string :notes
      t.integer  :port_id
      
      t.timestamps
    end
  end

  def self.down
    drop_table :tarif_calculations
  end
end
