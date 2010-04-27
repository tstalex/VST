class CreateProfTarifCalcs < ActiveRecord::Migration
  def self.up
    create_table :prof_tarif_calcs do |t|
      t.integer :tarif_id
      t.integer :proforma_id
      t.float :val

      t.timestamps
    end
  end

  def self.down
    drop_table :prof_tarif_calcs
  end
end
