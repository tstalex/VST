class AddColumnToProforma < ActiveRecord::Migration
  def self.up
    rename_column :proformas, :gt, :gw
  end

  def self.down
    rename_column :proformas, :gw, :gt
  end
end
