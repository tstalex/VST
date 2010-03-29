class CreateVesselTypes < ActiveRecord::Migration
  def self.up
    create_table :vessel_types do |t|
      t.string :name
      t.string :code

      t.timestamps
    end
  end

  def self.down
    drop_table :vessel_types
  end
end
