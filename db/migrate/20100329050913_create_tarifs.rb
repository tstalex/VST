class CreateTarifs < ActiveRecord::Migration
  def self.up
    create_table :tarifs do |t|
      t.string :name
      t.string :formula

      t.timestamps
    end
  end

  def self.down
    drop_table :tarifs
  end
end
