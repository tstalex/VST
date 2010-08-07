class RenameTreeElementSortOrdrt < ActiveRecord::Migration
  def self.up
    rename_column :tree_elements, :sort_ordrt, :sort_order

  end

  def self.down
    rename_column :tree_elements, :sort_order, :sort_ordrt
  end
end
