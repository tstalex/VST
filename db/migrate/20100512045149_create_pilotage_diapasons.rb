class CreatePilotageDiapasons < ActiveRecord::Migration
  def self.up
    create_table :pilotage_diapasons do |t|
      t.int, :from
      t.int :to

      t.timestamps
    end
  end

  def self.down
    drop_table :pilotage_diapasons
  end
end
