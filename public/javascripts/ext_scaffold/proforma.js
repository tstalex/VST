
function Proformas(){
    var proformaGridControl= null;
    var proformaEditControl=null;
    var proformaStoreControl=null;
    var proformaMainControl=null;


    this.del= function(){
        this.editPanel().deleteGridData(this.proformaGrid());
    };

    this.edit=function(){
        this.editPanel().loadData();
        this.editPanel().setEditable(true);
    };
    this.newRow=function(){
        this.editPanel().addNew(this.proformaGrid());
    };

    this.add = function() {
        this.editPanel().saveData(this.proformaGrid());
    };
            
    this.reset = function() {
        this.editPanel().loadData();
    };

    this.mainPanel = function(){
        if (proformaMainControl != null && !proformaMainControl.isDestroyed) {
            return  proformaMainControl;
        }
        proformaMainControl = new Ext.Panel({
            layout:"border",
            title:"Proforma",
            items:[this.proformaGrid(),this.proformaEditPanel() ]
        });
        this.gridPanel().viewPanel =this.proformaEditPanel();
        this.editPanel().grid=this.proformaGrid();

        this.gridPanel().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });
        this.gridPanel().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });

        return proformaMainControl;
    };
            
    this.editPanel=function(){
        if (proformaEditControl != null && !proformaEditControl.isDestroyed) {
            return  proformaEditControl;
        }
        proformaEditControl = new Ext.FormPanel({
            region:"center",
            url:'/proformas',
            frame:true,
            border:false,
            controller:this,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                 { fieldLabel: 'status',name: 'status' }
,                { fieldLabel: 'curr',name: 'curr' }
,                { fieldLabel: 'date_curr',name: 'date_curr' }
,                { fieldLabel: 'vessel_id',name: 'vessel_id' }
,                { fieldLabel: 'port_id',name: 'port_id' }
,                { fieldLabel: 'arrived',name: 'arrived' }
,                { fieldLabel: 'sailed',name: 'sailed' }
,                { fieldLabel: 'estimated_arrive',name: 'estimated_arrive' }
,                { fieldLabel: 'gt',name: 'gt' }
,                { fieldLabel: 'calls',name: 'calls' }
,                { fieldLabel: 'registration_date',name: 'registration_date' }

            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        Proforma.newRow();
                    }
                },{
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        Proforma.edit();
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        Proforma.add();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        Proforma.reset();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        Proforma.del();
                    }
                },


            ]
        }
                )
                ;
        proformaEditControl.data = {};
        proformaEditControl.setEditable(false);
        return proformaEditControl;    
    }

    this.gridPanel=function(){
         if (proformaGridControl != null && !proformaGridControl.isDestroyed)
            return proformaGridControl;

        proformaGridControl = new Ext.grid.GridPanel(
        {
            title:"Proformas",
            region:"north",
            store:this.proformaStore(),
            collapsible:true,
            split:true,
            controller:this,
            columns:[
                {
                    id:"id",
                    header:"#",
                    dataIndex:"id",
                    sortable:true,
                    hidden:true
                }
                ,{ dataIndex: 'status', header: 'status'  }
                ,{ dataIndex: 'curr', header: 'curr'  }
                ,{ dataIndex: 'date_curr', header: 'date_curr'  }
                ,{ dataIndex: 'vessel_id', header: 'vessel_id'  }
                ,{ dataIndex: 'port_id', header: 'port_id'  }
                ,{ dataIndex: 'arrived', header: 'arrived'  }
                ,{ dataIndex: 'sailed', header: 'sailed'  }
                ,{ dataIndex: 'estimated_arrive', header: 'estimated_arrive'  }
                ,{ dataIndex: 'gt', header: 'gt'  }
                ,{ dataIndex: 'calls', header: 'calls'  }
                ,{ dataIndex: 'registration_date', header: 'registration_date'  }

            ]
        });
        return proformaGridControl;
    }
 
    this.proformaStore= function(){
       if (proformaStoreControl != null)
            return proformaStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/proformas'
        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, [
            { name: 'id', mapping: 'id' }
                 ,{ name: 'status' , type: 'int' }
                ,{ name: 'curr' , type: 'string' }
                ,{ name: 'date_curr' , type: 'date', dateFormat: 'Y-m-d' }
                ,{ name: 'vessel_id' , type: 'int' }
                ,{ name: 'port_id' , type: 'int' }
                ,{ name: 'arrived' , type: 'datetime' }
                ,{ name: 'sailed' , type: 'datetime' }
                ,{ name: 'estimated_arrive' , type: 'date', dateFormat: 'Y-m-d' }
                ,{ name: 'gt' , type: 'float' }
                ,{ name: 'calls' , type: 'int' }
                ,{ name: 'registration_date' , type: 'date', dateFormat: 'Y-m-d' }

        ]);

        var writer = new Ext.data.JsonWriter();

        proformaStoreControl = new Ext.data.Store({
            restful: true,
            id: "proformas_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        proformaStoreControl.load();
        return proformaStoreControl; 
    }

}
