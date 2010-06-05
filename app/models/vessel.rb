class Vessel < ActiveRecord::Base
  belongs_to :type, :class_name => "VesselType", :foreign_key => "vessel_type"
  belongs_to :vessel_flag, :class_name=>"Country",:foreign_key => "flag"
  belongs_to :ice_class, :class_name=>"IceClass",:foreign_key => "ice_class_id"

end
