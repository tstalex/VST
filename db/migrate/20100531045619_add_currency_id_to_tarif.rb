class AddCurrencyIdToTarif < ActiveRecord::Migration
  def self.up
    add_column :tarifs, :currency_id, :integer
  end

  def self.down
    remove_column :tarifs, :currency_id
  end
end
