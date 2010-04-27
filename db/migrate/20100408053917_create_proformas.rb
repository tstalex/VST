class CreateProformas < ActiveRecord::Migration
  def self.up
    create_table :proformas do |t|
      t.integer :status
      t.string :curr
      t.date :date_curr
      t.integer :vessel_id
      t.integer :port_id
      t.datetime :arrived
      t.datetime :sailed
      t.date :estimated_arrive
      t.float :gt
      t.integer :calls
      t.date :registration_date

      t.timestamps
    end
  end

  def self.down
    drop_table :proformas
  end
end
