class CreateLightNaviTarifs < ActiveRecord::Migration
  def self.up
    create_table :light_navi_tarifs do |t|
      t.int :gt
      t.decimal :lighthouse
      t.decimal :navi

      t.timestamps
    end
  end

  def self.down
    drop_table :light_navi_tarifs
  end
end
