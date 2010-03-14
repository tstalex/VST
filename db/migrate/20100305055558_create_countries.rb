class CreateCountries < ActiveRecord::Migration
  def self.up
    create_table :countries do |t|
      t.string :text
      t.string :code
      t.integer :is_euro
      t.timestamps
    end
  end

  def self.down
    drop_table :countries
  end
end
