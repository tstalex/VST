Ext.namespace("Ext.ux");


Ext.ux.boolRenderer = function() {
    return function(value) {
        return String.format("{0}", (value == 1) ? 'Yes' : 'No');
    }
}

Ext.ux.storeRenderer = function(store, display_field) {
    return function(value) {
        var idx = store.find("id", value);
        if (idx > -1) {
            var rec = store.getAt(idx);
            return rec.data[display_field];
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
            return value + " " + combo.store.getTotalCount();
        }

    };
}

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