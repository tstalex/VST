class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.text :login
      t.text :pwd
      t.integer :role

      t.timestamps
    end
  end

  def self.down
    drop_table :users
  end
end
