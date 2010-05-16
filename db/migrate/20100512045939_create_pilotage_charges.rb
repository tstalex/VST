class CreatePilotageCharges < ActiveRecord::Migration
  def self.up
    create_table :pilotage_charges do |t|
      t.integer :diapason_id
      t.integer :gt_from
      t.integer :gt_to
      t.decimal :tarif

      t.timestamps
    end
  end

  def self.down
    drop_table :pilotage_charges
  end
end
