class Entity < ActiveRecord::Base
  @children=[]
  def leaf
   @children.blank?
  end
end
