var Tarif= new Tarifs();
function Tarifs(){
    var tarifGridControl= null;
    var tarifEditControl=null;
    var tarifStoreControl=null;
    var tarifMainControl=null;


    this.del= function(){
        this.tarifEditPanel().deleteGridData(this.tarifGrid());
    };

    this.edit=function(){
        this.tarifEditPanel().loadGridData(this.tarifGrid());
        this.tarifEditPanel().setEditable(true);
    };
    this.newRow=function(){
        this.tarifEditPanel().addNew(this.tarifGrid());
    };

    this.add = function() {
        this.tarifEditPanel().saveGridSata(this.tarifGrid());
    };
            
    this.reset = function() {
        tarifEditPanel().loadGridData(this.tarifGrid());
    };

    this.tarifPanel = function(){
        if (tarifMainControl != null && !tarifMainControl.isDestroyed) {
            return  tarifMainControl;
        }
        tarifMainControl = new Ext.Panel({
            layout:"border",
            title:"Tarif",
            items:[this.tarifGrid(),this.tarifEditPanel() ]
        });
                
        this.tarifGrid().getSelectionModel().on("rowselect", function(grid, rowIndex, e) {
            Tarif.tarifEditPanel().loadGridData(grid);
        });
        this.tarifGrid().getSelectionModel().on("rowdeselect", function(grid, rowIndex, e) {
            Tarif.tarifEditPanel().loadGridData(grid);
        });

        return tarifMainControl;
    };
            
    this.tarifEditPanel=function(){
        if (tarifEditControl != null && !tarifEditControl.isDestroyed) {
            return  tarifEditControl;
        }
        tarifEditControl = new Ext.FormPanel({
            region:"center",
            url:'/tarifs',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                 { fieldLabel: 'name',name: 'name' }
,                { fieldLabel: 'formula',name: 'formula' }

            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        Tarif.newRow();
                    }
                },{
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        Tarif.edit();
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        Tarif.add();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        Tarif.reset();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        Tarif.del();
                    }
                },


            ]
        }
                )
                ;
        tarifEditControl.data = {};
        tarifEditControl.setEditable(false);
        return tarifEditControl;    
    }

    this.tarifGrid=function(){
         if (tarifGridControl != null && !tarifGridControl.isDestroyed)
            return tarifGridControl;

        tarifGridControl = new Ext.grid.GridPanel(
        {
            title:"Tarifs",
            region:"north",
            store:this.tarifStore(),
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
                ,{ dataIndex: 'name', header: 'name'  }
                ,{ dataIndex: 'formula', header: 'formula'  }

            ]
        });
        return tarifGridControl;
    }
 
    this.tarifStore= function(){
       if (tarifStoreControl != null)
            return tarifStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/tarifs'
        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, [
            { name: 'id', mapping: 'id' }
                 ,{ name: 'name' , type: 'string' }
                ,{ name: 'formula' , type: 'string' }

        ]);

        var writer = new Ext.data.JsonWriter();

        tarifStoreControl = new Ext.data.Store({
            restful: true,
            id: "tarifs_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        tarifStoreControl.load();
        return tarifStoreControl; 
    }

}
