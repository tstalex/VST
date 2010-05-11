# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100509090457) do

  create_table "countries", :force => true do |t|
    t.string   "text"
    t.string   "code"
    t.integer  "is_euro"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "currencies", :force => true do |t|
    t.string   "curr"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ice_classes", :force => true do |t|
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ports", :force => true do |t|
    t.string   "name"
    t.integer  "country"
    t.string   "code"
    t.integer  "flag"
    t.text     "tips"
    t.text     "description"
    t.string   "picture"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "posts", :force => true do |t|
    t.string   "name"
    t.integer  "val"
    t.integer  "val1"
    t.string   "name2"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "prof_tarif_calcs", :force => true do |t|
    t.integer  "tarif_id"
    t.integer  "proforma_id"
    t.float    "val"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "description"
    t.string   "remark"
  end

  create_table "proformas", :force => true do |t|
    t.integer  "status"
    t.string   "curr"
    t.date     "date_curr"
    t.integer  "vessel_id"
    t.integer  "port_id"
    t.datetime "arrived"
    t.datetime "sailed"
    t.date     "estimated_arrive"
    t.float    "gw"
    t.integer  "calls"
    t.date     "registration_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "passengers"
  end

  create_table "tarif_calculations", :force => true do |t|
    t.date     "from"
    t.date     "to"
    t.boolean  "active"
    t.string   "notes"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "port_id"
  end

  create_table "tarifs", :force => true do |t|
    t.integer  "tarif_calculation_id"
    t.string   "name"
    t.string   "formula"
    t.boolean  "is_manual"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "remark"
    t.string   "curr"
  end

  create_table "vessel_types", :force => true do |t|
    t.string   "name"
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "vessels", :force => true do |t|
    t.string   "name"
    t.integer  "flag"
    t.integer  "vessel_type"
    t.integer  "owner_id"
    t.float    "loa"
    t.float    "vessel_length"
    t.float    "beam"
    t.float    "dw"
    t.float    "draft"
    t.integer  "gross_tonnage"
    t.integer  "net_tonnage"
    t.integer  "cap1"
    t.integer  "paxcap"
    t.integer  "ice_class"
    t.string   "calls"
    t.string   "contact_info"
    t.float    "max_draft"
    t.date     "safety_cert_date"
    t.date     "construction_cert_date"
    t.date     "equipment_date"
    t.date     "security_cert_date"
    t.date     "int_load_line_cert_date"
    t.date     "oil_pollut_prevent_date"
    t.date     "tonnage_cert_issued_date"
    t.date     "sanitation_contr_exempt_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
