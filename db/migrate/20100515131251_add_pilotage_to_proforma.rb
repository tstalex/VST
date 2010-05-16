class AddPilotageToProforma < ActiveRecord::Migration
  def self.up
    add_column :proformas, :pilotage, :int
  end

  def self.down
    remove_column :proformas, :pilotage
  end
end
