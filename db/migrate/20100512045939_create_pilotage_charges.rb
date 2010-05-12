class CreatePilotageCharges < ActiveRecord::Migration
  def self.up
    create_table :pilotage_charges do |t|
      t.int :diapason_id
      t.int :gt_from
      t.int :gt_to
      t.decimal :tarif

      t.timestamps
    end
  end

  def self.down
    drop_table :pilotage_charges
  end
end
