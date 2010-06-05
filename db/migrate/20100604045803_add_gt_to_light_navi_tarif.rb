class AddGtToLightNaviTarif < ActiveRecord::Migration
  def self.up
    add_column :light_navi_tarifs, :gt_from, :int
    add_column :light_navi_tarifs, :gt_to, :int
  end

  def self.down
    remove_column :light_navi_tarifs, :gt_to
    remove_column :light_navi_tarifs, :gt_from
  end
end
