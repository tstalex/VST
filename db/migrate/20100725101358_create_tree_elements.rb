class CreateTreeElements < ActiveRecord::Migration
  def self.up
    create_table :tree_elements do |t|
      t.string :name
      t.text :tag
      t.integer :parent_id
      t.integer :sort_ordrt

      t.timestamps
    end
  end

  def self.down
    drop_table :tree_elements
  end
end
