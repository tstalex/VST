var Currency= new Currencies();
function Currencies(){
    var currencyGridControl= null;
    var currencyEditControl=null;
    var currencyStoreControl=null;
    var currencyMainControl=null;


    this.del= function(){
        this.currencyEditPanel().deleteGridData(this.currencyGrid());
    };

    this.edit=function(){
        this.currencyEditPanel().loadGridData(this.currencyGrid());
        this.currencyEditPanel().setEditable(true);
    };
    this.newRow=function(){
        this.currencyEditPanel().addNew(this.currencyGrid());
    };

    this.add = function() {
        this.currencyEditPanel().saveGridSata(this.currencyGrid());
    };
            
    this.reset = function() {
        currencyEditPanel().loadGridData(this.currencyGrid());
    };

    this.mainPanel = function(){
        if (currencyMainControl != null && !currencyMainControl.isDestroyed) {
            return  currencyMainControl;
        }
        currencyMainControl = new Ext.Panel({
            layout:"border",
            title:"Currency",
            items:[this.currencyGrid(),this.currencyEditPanel() ]
        });
        this.gridPanel().viewPanel =this.currencyEditPanel();
        this.editPanel().grid=this.currencyGrid();

        this.gridPanel().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });
        this.gridPanel().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });

        return currencyMainControl;
    };
            
    this.editPanel=function(){
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

            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        Currency.newRow();
                    }
                },{
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        Currency.edit();
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        Currency.add();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        Currency.reset();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        Currency.del();
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

    this.gridPanel=function(){
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
                ,{ dataIndex: 'curr', header: 'curr'  }

            ]
        });
        return currencyGridControl;
    }
 
    this.currencyStore= function(){
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
                 ,{ name: 'curr' , type: 'string' }

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
