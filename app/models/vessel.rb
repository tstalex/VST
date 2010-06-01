class Vessel < ActiveRecord::Base
  belongs_to :type, :class_name => "VesselType", :foreign_key => "vessel_type"
end
