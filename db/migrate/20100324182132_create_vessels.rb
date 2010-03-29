class CreateVessels < ActiveRecord::Migration
  def self.up
    create_table :vessels do |t|
      t.string :name
      t.integer :flag
      t.integer :vesel_type
      t.integer :owner_id
      t.float :loa
      t.float :vessel_length
      t.float :beam
      t.float :dw
      t.float :draft
      t.integer :gross_tonnage
      t.integer :net_tonnage
      t.integer :cap1
      t.integer :paxcap
      t.integer :ice_class
      t.string :calls
      t.string :contact_info
      t.float :max_draft
      t.date :safety_cert_date
      t.date :construction_cert_date
      t.date :equipment_date
      t.date :security_cert_date
      t.date :int_load_line_cert_date
      t.date :oil_pollut_prevent_date
      t.date :tonnage_cert_issued_date
      t.date :sanitation_contr_exempt_date

      t.timestamps
    end
  end

  def self.down
    drop_table :vessels
  end
end
