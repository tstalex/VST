var PilotageCharge= new PilotageCharges();
function PilotageCharges(){
    var pilotage_chargeGridControl= null;
    var pilotage_chargeEditControl=null;
    var pilotage_chargeStoreControl=null;
    var pilotage_chargeMainControl=null;


    this.del= function(){
        this.editPanel().deleteGridData(this.pilotage_chargeGrid());
    };

    this.edit=function(){
        this.editPanel().loadData();
        this.editPanel().setEditable(true);
    };
    this.newRow=function(){
        this.editPanel().addNew(this.pilotage_chargeGrid());
    };

    this.add = function() {
        this.editPanel().saveData();
    };
            
    this.reset = function() {
        this.editPanel().loadData();
    };

    this.mainPanel = function(){
        if (pilotage_chargeMainControl != null && !pilotage_chargeMainControl.isDestroyed) {
            return  pilotage_chargeMainControl;
        }
        pilotage_chargeMainControl = new Ext.Panel({
            layout:"border",
            title:"PilotageCharge",
            items:[this.gridPanel(),this.editPanel() ]
        });
        this.gridPanel().viewPanel =this.editPanel();
        this.editPanel().grid=this.pilotage_chargeGrid();

        this.gridPanel().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });
        this.gridPanel().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });

        return pilotage_chargeMainControl;
    };
            
    this.editPanel=function(){
        if (pilotage_chargeEditControl != null && !pilotage_chargeEditControl.isDestroyed) {
            return  pilotage_chargeEditControl;
        }
        pilotage_chargeEditControl = new Ext.FormPanel({
            region:"center",
            url:'/pilotage_charges',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                 { fieldLabel: 'diapason_id',name: 'diapason_id' }
,                { fieldLabel: 'gt_from',name: 'gt_from' }
,                { fieldLabel: 'gt_to',name: 'gt_to' }
,                { fieldLabel: 'tarif',name: 'tarif' }

            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        btn.getFormPanel().controller.newRow();
                    }
                },{
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
        pilotage_chargeEditControl.data = {};
        pilotage_chargeEditControl.setEditable(false);
        return pilotage_chargeEditControl;    
    }

    this.gridPanel=function(){
         if (pilotage_chargeGridControl != null && !pilotage_chargeGridControl.isDestroyed)
            return pilotage_chargeGridControl;

        pilotage_chargeGridControl = new Ext.grid.GridPanel(
        {
            title:"PilotageCharges",
            region:"north",
            store:this.pilotage_chargeStore(),
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
                ,{ dataIndex: 'diapason_id', header: 'diapason_id'  }
                ,{ dataIndex: 'gt_from', header: 'gt_from'  }
                ,{ dataIndex: 'gt_to', header: 'gt_to'  }
                ,{ dataIndex: 'tarif', header: 'tarif'  }

            ]
        });
        return pilotage_chargeGridControl;
    }
 
    this.pilotage_chargeStore= function(){
       if (pilotage_chargeStoreControl != null)
            return pilotage_chargeStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/pilotage_charges'
        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, [
            { name: 'id', mapping: 'id' }
                 ,{ name: 'diapason_id' , type: 'int' }
                ,{ name: 'gt_from' , type: 'int' }
                ,{ name: 'gt_to' , type: 'int' }
                ,{ name: 'tarif' , type: 'decimal' }

        ]);

        var writer = new Ext.data.JsonWriter();

        pilotage_chargeStoreControl = new Ext.data.Store({
            restful: true,
            id: "pilotage_charges_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        pilotage_chargeStoreControl.load();
        return pilotage_chargeStoreControl; 
    }

}
