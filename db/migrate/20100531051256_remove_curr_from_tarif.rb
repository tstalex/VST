class RemoveCurrFromTarif < ActiveRecord::Migration
  def self.up
    remove_column :tarifs, :curr
  end

  def self.down
    add_column :tarifs, :curr, :string
  end
end
