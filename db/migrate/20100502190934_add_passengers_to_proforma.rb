class AddPassengersToProforma < ActiveRecord::Migration
  def self.up
    add_column :proformas, :passengers, :integer, :null => false,:default => 0
  end

  def self.down
    remove_column :proformas, :passengers
  end
end
