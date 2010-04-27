class AddCurrToTarif < ActiveRecord::Migration
  def self.up
    add_column :tarifs, :curr, :string
  end

  def self.down
    remove_column :tarifs, :curr
  end
end
