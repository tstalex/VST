module TreeElementsHelper
  def get_tree (entities)
    ret=nil

    entities.each { |entity|
      if (entity.parent_id.nil?)
        ret=entity
      end
      entities.each { |entity_rel|
        if (entity.id==entity_rel.parent_id)
          entity.children.push(entity_rel)
        end
      }
      if (entity.query?)
        data=TreeElement.find_by_sql(entity.query)
        entity.children.push data
      end

      entity.write_attribute(:children, entity.children)
      entity.write_attribute(:leaf, entity.leaf)

    }
    [ret]
  end
end
