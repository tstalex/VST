class RenameVesselIceClass < ActiveRecord::Migration
  def self.up
    rename_column :vessels, :ice_class, :ice_class_id

  end

  def self.down
    rename_column :vessels, :ice_class_id, :ice_class
  end
end
