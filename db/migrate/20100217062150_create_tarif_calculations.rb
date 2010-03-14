class CreateTarifCalculations < ActiveRecord::Migration
  def self.up
    create_table :tarif_calculations do |t|
      t.string :name
      t.date :calc_date
      t.string :notes

      t.timestamps
    end
  end

  def self.down
    drop_table :tarif_calculations
  end
end
