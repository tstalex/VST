class CreatePorts < ActiveRecord::Migration
  def self.up
    create_table :ports do |t|
      t.string :name
      t.integer :country
      t.string :code
      t.integer :flag
      t.text :tips
      t.text :description
      t.string :picture

      t.timestamps
    end
  end

  def self.down
    drop_table :ports
  end
end
