class RenamePilotageChargeColumn < ActiveRecord::Migration
  def self.up
    rename_column :pilotage_diapasons, :from, :pilotage_from
    rename_column :pilotage_diapasons, :to, :pilotage_to
  end

  def self.down
    rename_column :pilotage_diapasons, :pilotage_from, :from
    rename_column :pilotage_diapasons, :pilotage_to, :to
  end
end
