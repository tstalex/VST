class AddCurrencyIdToProforma < ActiveRecord::Migration
  def self.up
    add_column :proformas, :currency_id, :integer
  end

  def self.down
    remove_column :proformas, :currency_id
  end
end
