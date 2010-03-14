Ext.override(Ext.FormPanel, {

    saveGridSata : function(grid) {
        var rec = grid.getSelectionModel().getSelected();
        this.getForm().items.each(function(field) {

            if (field.name && (name = field.name) && (value = field.getValue()) !== undefined) {
                rec.set(name, value);
                console.log("field " + field.name + " got value " + field.getValue());
            }
        }, this);
        grid.store.fireEvent('datachanged', grid.store);
        grid.store.commitChanges();
        grid.store.save();
    },

    loadGridData : function(grid) {
        var record = grid.getSelectionModel().getSelected();
        var values = record.data;
        this.getForm().items.each(function(field) {
            if (field.name && (name = field.name) && (value = values[name]) !== undefined) {
                console.log("field " + name + " got value " + value);
                field.setValue(value);
                if (this.trackResetOnLoad) {
                    field.originalValue = field.getValue();
                }
            }
        }, this);
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

var App = new Application();
var Dict = new Dicts();
var Calc = new Calculation();
var Ports = new Ports();


function Application() {
    var currentpanel = new Ext.Panel({region:"center"});
    var mainPanel = null;

    this.showMainPanel = function(newPanel) {
        if (currentpanel == newPanel)
            return;
        var center = Ext.getCmp('center_panel');
        center.remove(currentpanel);
        center.add(newPanel);
        center.getLayout().setActiveItem(newPanel);
        center.doLayout();
        currentpanel = newPanel;
    }
    this.countriesPanel = function() {
        var ret = {
            xtype:"panel",
            layout:"fit",
            title:"Ports", items:[Dict.countriesGrid()]};

        Dict.countriesGrid().on("rowclick", function(grid, rowIndex, e) {
            var rec = grid.store.getAt(rowIndex);
            var country_id = rec.data.id;
            var grid = Ports.showPanel(country_id);
            App.showMainPanel(grid);
        });


        return  ret;
    }

    this.buildLayout = function() {
        var treePanel = new Ext.Panel(
        {
            id:"tree-panel",
            title:'Navigation',
            width:130,
            region:"west",
            layout:"accordion",
            collapsible:true,
            items: [
                this.countriesPanel(),
                {
                    title: 'Tarifs information',
                    html: '<p></p>'
                }
            ],
            split:true
        }
                );
        mainPanel = new Ext.Viewport(
        {
            id:'main-panel',
            layout:'border',
            renderTo:"main",
            items:[
                {
                    id:"center_panel",
                    region:"center",
                    layout:"card",
                    items:[currentpanel]
                }
                ,
                treePanel
            ]
        }
                );
    };

    var storesToLoad = [
        {
            store : "dict_store"
        }
    ];

    this.start = function(record, options, success) {
        var task = storesToLoad.shift();  //From the top
        if (task) {
            if (success !== false) {
                task.callback = arguments.callee
                var store = Ext.StoreMgr.lookup(task.store);
                store ? store.load(task) : console.log('bad store specified');
            } else {
                console.log("Store loaded");
            }
        } else {
            App.buildLayout();
        }
    };
}