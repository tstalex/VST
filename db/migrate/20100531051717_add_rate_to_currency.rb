class AddRateToCurrency < ActiveRecord::Migration
  def self.up
    add_column :currencies, :rate, :decimal
  end

  def self.down
    remove_column :currencies, :rate
  end
end
