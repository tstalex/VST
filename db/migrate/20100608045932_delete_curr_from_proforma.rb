class DeleteCurrFromProforma < ActiveRecord::Migration
  def self.up
    remove_column :proformas, :curr
  end

  def self.down
   add_column :proformas, :curr, :string 
  end
end
