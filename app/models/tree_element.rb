class TreeElement < ActiveRecord::Base

  def children
    if (@children.nil?)
      @children=[]
    end
    @children
  end

  def push (elem)
    @children.push(elem)
  end

  def leaf
    @children.blank?
  end
end
