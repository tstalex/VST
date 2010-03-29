Ext.override(Ext.FormPanel, {
    grid:null,

    addNew:function(grid) {
        this.grid = grid;
        if(grid.getSelectionModel().getSelected())
            grid.getSelectionModel().clearSelections();
        var p = new grid.store.recordType();
        this.setValues(p.data);
        this.setEditable(true);        
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
        console.log(values);
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
    loadGridData : function(grid) {
        this.grid = grid;
        var record = (grid.getSelectionModel().getSelected())? grid.getSelectionModel().getSelected() : new grid.store.recordType();
        var values = record.data;
        this.setValues(values);
        this.setEditable(false);
        return this;
    }
    ,
    resetData: function(grid) {
        this.grid = grid;
        var p = (grid.getSelectionModel().getSelected())? grid.getSelectionModel().getSelected() : new grid.store.recordType();
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
    }
});

Ext.override(Ext.grid.GridPanel, {
    viewPanel:null,
    showInView: function(viewPanel) {
        viewPanel.loadData(this);
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