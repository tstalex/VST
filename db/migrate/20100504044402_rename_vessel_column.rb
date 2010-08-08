class RenameVesselColumn < ActiveRecord::Migration
  def self.up
    rename_column :vessels, :vesel_type ,:vessel_type
  end

  def self.down
    rename_column :vessels, :vessel_type ,:vesel_type
  end
end
