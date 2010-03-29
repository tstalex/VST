class CreateIceClasses < ActiveRecord::Migration
  def self.up
    create_table :ice_classes do |t|
      t.string :code

      t.timestamps
    end
  end

  def self.down
    drop_table :ice_classes
  end
end
