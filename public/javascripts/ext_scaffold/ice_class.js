var IceClass = new IceClasss();
function IceClasss() {
    var ice_classGridControl = null;
    var ice_classEditControl = null;
    var ice_classStoreControl = null;
    var ice_classMainControl = null;


    this.del = function() {
        this.ice_classEditPanel().deleteGridData(this.ice_classGrid());
    };

    this.edit = function() {
        this.ice_classEditPanel().loadGridData(this.ice_classGrid());
        this.ice_classEditPanel().setEditable(true);
    };
    this.newRow = function() {
        this.ice_classEditPanel().addNew(this.ice_classGrid());
    };

    this.add = function() {
        this.ice_classEditPanel().saveGridSata(this.ice_classGrid());
    };

    this.reset = function() {
        ice_classEditPanel().loadGridData(this.ice_classGrid());
    };

    this.ice_classPanel = function() {
        if (ice_classMainControl != null && !ice_classMainControl.isDestroyed) {
            return  ice_classMainControl;
        }
        ice_classMainControl = new Ext.Panel({
            layout:"border",
            title:"IceClass",
            items:[this.ice_classGrid(),this.ice_classEditPanel() ]
        });
        this.ice_classGrid().on("rowclick", function(grid, rowIndex, e) {
            IceClass.ice_classEditPanel().loadGridData(grid);
        });
        return ice_classMainControl;
    };

    this.ice_classEditPanel = function() {
        if (ice_classEditControl != null && !ice_classEditControl.isDestroyed) {
            return  ice_classEditControl;
        }
        ice_classEditControl = new Ext.FormPanel({
            region:"center",
            url:'/ice_classes',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                {
                    fieldLabel: 'code',
                    name: 'code'
                }

            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        IceClass.newRow();
                    }
                },
                {
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        IceClass.edit();
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        IceClass.add();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        IceClass.reset();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        IceClass.del();
                    }
                },


            ]
        }
                )
                ;
        ice_classEditControl.data = {};
        ice_classEditControl.setEditable(false);
        return ice_classEditControl;
    }

    this.ice_classGrid = function() {
        if (ice_classGridControl != null && !ice_classGridControl.isDestroyed)
            return ice_classGridControl;

        ice_classGridControl = new Ext.grid.GridPanel(
        {
            title:"IceClasss",
            region:"north",
            store:this.ice_classStore(),
            collapsible:true,
            split:true,
            columns:[
                {
                    id:"id",
                    header:"#",
                    dataIndex:"id",
                    sortable:true,
                    hidden:true
                }
                ,
                {
                    dataIndex: 'code',
                    header: 'code'
                }

            ]
        });
        return ice_classGridControl;
    }

    this.ice_classStore = function() {
        if (ice_classStoreControl != null)
            return ice_classStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/ice_classes'
        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, [
            {
                name: 'id',
                mapping: 'id'
            }
            ,
            {
                name: 'code' ,
                type: 'string'
            }

        ]);

        var writer = new Ext.data.JsonWriter();

        ice_classStoreControl = new Ext.data.Store({
            restful: true,
            id: "ice_classs_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        ice_classStoreControl.load();
        return ice_classStoreControl;
    }

}
