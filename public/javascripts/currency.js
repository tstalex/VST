function Currencies() {
    var currencyGridControl = null;
    var currencyEditControl = null;
    var currencyStoreControl = null;
    var currencyMainControl = null;


    this.del = function() {
        this.editPanel().deleteGridData(this.currencyGrid());
    };

    this.edit = function() {
        this.editPanel().loadData();
        this.editPanel().setEditable(true);
    };
    this.newRow = function() {
        this.editPanel().addNew(this.gridPanel());
    };

    this.add = function() {
        this.editPanel().saveData();
    };

    this.reset = function() {
        this.editPanel().loadData();
    };

    this.mainPanel = function() {
        if (currencyMainControl != null && !currencyMainControl.isDestroyed) {
            return  currencyMainControl;
        }
        currencyMainControl = new Ext.Panel({
            layout:"border",
            title:"Currency",
            items:[this.gridPanel(),this.editPanel() ]
        });
        this.gridPanel().viewPanel = this.editPanel();
        this.editPanel().grid = this.gridPanel();

        this.gridPanel().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadData();
        });
        this.gridPanel().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadData();
        });

        return currencyMainControl;
    };

    this.editPanel = function() {
        if (currencyEditControl != null && !currencyEditControl.isDestroyed) {
            return  currencyEditControl;
        }
        currencyEditControl = new Ext.FormPanel({
            region:"center",
            url:'/currencies',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                { fieldLabel: 'curr',name: 'curr' }
                ,
                { fieldLabel: 'rate',name: 'rate' }

            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        btn.getFormPanel().controller.newRow();
                    }
                },
                {
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        btn.getFormPanel().controller.edit();
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        btn.getFormPanel().controller.add();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        btn.getFormPanel().controller.reset();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        btn.getFormPanel().controller.del();
                    }
                },


            ]
        }
                )
                ;
        currencyEditControl.data = {};
        currencyEditControl.setEditable(false);
        return currencyEditControl;
    }

    this.gridPanel = function() {
        if (currencyGridControl != null && !currencyGridControl.isDestroyed)
            return currencyGridControl;

        currencyGridControl = new Ext.grid.GridPanel(
        {
            title:"Currencies",
            region:"north",
            store:this.currencyStore(),
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
                { dataIndex: 'curr', header: 'curr'  }
                ,
                { dataIndex: 'rate', header: 'rate'  }

            ]
        });
        return currencyGridControl;
    }

    this.currencyStore = function() {
        if (currencyStoreControl != null)
            return currencyStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/currencies'
        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, [
            { name: 'id', mapping: 'id' }
            ,
            { name: 'curr' , type: 'string' }
            ,
            { name: 'rate' , type: 'decimal' }

        ]);

        var writer = new Ext.data.JsonWriter();

        currencyStoreControl = new Ext.data.Store({
            restful: true,
            id: "currencies_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        currencyStoreControl.load();
        return currencyStoreControl;
    }

}
