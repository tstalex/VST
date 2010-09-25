Ext.namespace("Ext.ux");


Ext.ux.boolRenderer = function() {
    return function(value) {
        return String.format("{0}", (value == 1) ? 'Yes' : 'No');
    }
}

Ext.ux.storeRenderer = function(store, display_field) {
    return function(value) {
        return store.searchField(display_field, value);
    }
}
Ext.ux.forignKeyRenderer = function(pkStore, fkStore, fk, display_field) {
    return function(value) {


        var idx = fkStore.find("id", value);
        if (idx > -1) {
            var rec = fkStore.getAt(idx);
            var fkValue = rec.data[fk]
            if (fkValue && fkValue > -1) {
                return pkStore.searchField(display_field, fkValue)
            } else {
                return "_";
            }
        } else {
            return value;
        }
    }
}

Ext.ux.comboBoxRenderer = function(combo) {
    return function(value) {
        var idx = combo.store.find(combo.valueField, value);
        if (idx > -1) {
            var rec = combo.store.getAt(idx);
            return rec.get(combo.displayField);
        } else {
			console.log("comboBoxRenderer");
            return value + " " + combo.store.getTotalCount();
        }
		console.log(combo.store.data);
    };
}

Ext.form.ComboBox.prototype.filterBy = function(fn, scope) {
	var ds = this.store;
	ds.filterBy(fn, scope);
	ds.realSnapshot = ds.snapshot;
	ds.snapshot = ds.data;
};

Ext.form.ComboBox.prototype.clearFilter = function(suppressEvent) {
	var ds = this.store;
	if (ds.realSnapshot && ds.realSnapshot != ds.snapshot) {
		ds.snapshot = ds.realSnapshot;
		delete ds.realSnapshot;
	}
	ds.clearFilter(suppressEvent);
};

Ext.override(Ext.FormPanel, {
    grid:null,
    controller:null,
    addNew:function(grid) {
        this.grid = grid;
        if (grid.getSelectionModel().getSelected())
            grid.getSelectionModel().clearSelections();
        var p = new grid.store.recordType();
        this.setValues(p.data);
        this.setEditable(true);
    }
    ,
    saveData : function() {
        var grid = this.controller.gridPanel();
        var rec = grid.getSelectionModel().getSelected();
        if (rec == null) {
            rec = new grid.store.recordType();
        }
        this.getForm().items.each(function(field) {
			
			console.log("field.name "+field.name+" value="+field.getValue()+" submitValue="+ field.submitValue);
			
            if (field.name && (name = field.name) && (value = field.getValue()) !== undefined) {
                rec.set(name, value);
				console.log("	name="+name+" value="+value);
            }
        }, this);
        if (!grid.store.getById(rec.id)) {
            grid.store.add(rec);
        }
        grid.store.fireEvent('datachanged', grid.store);
        grid.store.commitChanges();
        grid.store.save();
        this.setEditable(false);
    }
    ,
    saveGridSata : function(grid) {
        this.grid = grid;
        var rec = grid.getSelectionModel().getSelected();
        if (rec == null) {
            rec = new grid.store.recordType();
        }
        this.getForm().items.each(function(field) {

            if (field.name && (name = field.name) && (value = field.getValue()) !== undefined) {
                rec.set(name, value);
            }
        }, this);
        if (!grid.store.getById(rec.id)) {
            grid.store.add(rec);
        }
        grid.store.fireEvent('datachanged', grid.store);
        grid.store.commitChanges();
        grid.store.save();
        this.setEditable(false);
    },

    handleButtons:function() {
        var bt = this.getBottomToolbar().items;
        var i = 0;
        var hasSelected = (this.grid) ? this.grid.getSelectionModel().getSelected() != null : false;
        if (this.editable) {
            bt.get(i++).hide(); //new

            bt.get(i++).hide(); //edit
            bt.get(i++).show();//save
            bt.get(i++).show();//cancel
            bt.get(i++).hide();//del
        } else {
            bt.get(i++).show();

            if (hasSelected) {
                bt.get(i++).show();
            } else {
                bt.get(i++).hide();
            }
            bt.get(i++).hide();
            bt.get(i++).hide();
            if (hasSelected) {
                bt.get(i++).show();
            } else {
                bt.get(i++).hide();
            }

        }
    }
    ,
    setEditable: function(isEditable) {
        this.getForm().items.each(function(i) {
            i.setReadOnly(!isEditable);
        });
        this.editable = isEditable;
        this.handleButtons();
    }
    ,
    setValues:function(values) {
        this.getForm().reset();
        this.getForm().items.each(function(field) {
            if (field.name && (name = field.name) && (value = values[name]) !== undefined) {
                field.setValue(value);
                if (this.trackResetOnLoad) {
                    field.originalValue = field.getValue();
                }
            }
        }, this);
    }
    ,
	
	putValues:function(rec){
		this.getForm().items.each( function(field) {
			if(Ext.isDefined(this.get(field.name))){
				this.set(field.name,field.getValue());
			}
        }, rec);
	}
	,
    loadData : function() {
        var record = (this.grid.getSelectionModel().getSelected()) ? this.grid.getSelectionModel().getSelected() : new this.grid.store.recordType();
        var values = record.data;
        this.setValues(values);
        this.setEditable(false);
        return this;
    },
    loadGridData : function(grid) {
        this.grid = grid;
        var record = (grid.getSelectionModel().getSelected()) ? grid.getSelectionModel().getSelected() : new grid.store.recordType();
        var values = record.data;
        this.setValues(values);
        this.setEditable(false);
        return this;
    }
    ,
    resetData: function(grid) {
        this.grid = grid;
        var p = (grid.getSelectionModel().getSelected()) ? grid.getSelectionModel().getSelected() : new grid.store.recordType();
        this.setValues(p.data);
        this.setEditable(false);
    }
    ,
    deleteGridData : function(grid) {
        this.grid = grid;
        var record = grid.getSelectionModel().getSelected();

        if (!record)
            return;
        Ext.Msg.confirm('Confirm delete', 'Are you sure to delete this record?', function(btn, text) {
            if (btn == 'yes') {
                grid.store.remove(record);
                this.loadGridData(grid);
            }
        });
        return this;
    },
    getFieldByName: function(name) {
        var ret = null;
        this.getForm().items.each(function(field) {
            if (field.name == name) {
                ret = field;
            }
        });
        if (ret == null)
            console.log("Field " + name + " not found!");
        return ret;
    }
});

Ext.override(Ext.grid.GridPanel, {
    controller:null,
    viewPanel:null,
    showInView: function(viewPanel) {
        viewPanel.loadData(this);
    },
	getSelectedColumnValue:function(col){
		var row= this.getSelectionModel().getSelected();
		if(row==null)
			return null;
		if(Ext.isArray(row)){
			ret= [];
			Ext.each(row,function(obj,indx,arr){
				this.push(obj.get(col));
			},ret);
			return ret;
		}else{
			return row.get(col);
		}
		
	}
});

Ext.override(Ext.Button, {
    getFormPanel:function() {
        return this.findParentByType("form");
    }
});

Ext.override(Ext.form.Field, {
    getName: function() {
        return this.rendered && this.el.dom.name ? this.el.dom.name :
               this.name || this.id || '';
    }
});


Ext.override(Ext.form.ComboBox, {
    getName: function() {
        return this.hiddenField && this.hiddenField.name ? this.hiddenField.name :
               this.hiddenName || Ext.form.ComboBox.superclass.getName.call(this);
    }
});

Ext.override(Ext.form.FieldSet, {
    setReadOnly: function(isRo) {
        //do nothing
    }
});

Ext.override(Ext.data.Store, {
    searchField: function(field_name, rec_id) {
        var idx = this.find("id", rec_id);
        if (idx > -1) {
            var rec = this.getAt(idx);
            return rec.data[field_name];
        } else {
            return rec_id;
        }
    }

});

Ext.override(Ext.grid.EditorGridPanel, {
    handler_to_makeReadOnly: function() {
        return false;
    },
    setPanelReadOnly:function(isRo)
    {
        if (isRo) {
            this.on('beforeedit', this.handler_to_makeReadOnly, this);
        } else {
            this.un('beforeedit', this.handler_to_makeReadOnly, this);
        }
    }
})

Ext.override(Ext.form.DateField,{
	format:'d.m.Y'
})

Ext.override(Ext.ux.form.DateTime,{
	dateFormat:'d.m.Y',
	timeFormat:'H:i'
})

Ext.IframeWindow = Ext.extend(Ext.Window, {
onRender: function() {
    this.bodyCfg = {
		id:this.iframe_id,
        tag: 'iframe',
        src: this.src,
        cls: this.bodyCls,
		name:this.iframe_id,
        style: {
            border: '0px none'
        }
    };
    Ext.IframeWindow.superclass.onRender.apply(this, arguments);
}
});
