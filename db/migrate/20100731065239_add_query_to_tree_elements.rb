class AddQueryToTreeElements < ActiveRecord::Migration
  def self.up
    add_column :tree_elements, :query, :text
  end

  def self.down
    remove_column :tree_elements, :query
  end
end
