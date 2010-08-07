class RenameTreeElementName < ActiveRecord::Migration
  def self.up
    rename_column :tree_elements, :name, :text
  end

  def self.down
    rename_column :tree_elements, :text, :name
  end
end
