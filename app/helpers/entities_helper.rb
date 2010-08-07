module EntitiesHelper

  def get_tree (entities)
    ret=nil
    entities.each { |entity|
      if (entity.parent_entity_id.nil?)
        ret=entity
      end
      entities.each { |entity_rel|
        if (entity.id==entity_rel.parent_entity_id)
          entity.children.push(entity_rel)
        end
      }
    }
    ret
  end
end
