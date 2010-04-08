class AddRemarkToTarif < ActiveRecord::Migration
  def self.up
    add_column :tarifs, :remark, :string
  end

  def self.down
    remove_column :tarifs, :remark
  end
end
