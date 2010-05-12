var PilotageDiapason= new PilotageDiapasons();
function PilotageDiapasons(){
    var pilotage_diapasonGridControl= null;
    var pilotage_diapasonEditControl=null;
    var pilotage_diapasonStoreControl=null;
    var pilotage_diapasonMainControl=null;


    this.del= function(){
        this.editPanel().deleteGridData(this.pilotage_diapasonGrid());
    };

    this.edit=function(){
        this.editPanel().loadData();
        this.editPanel().setEditable(true);
    };
    this.newRow=function(){
        this.editPanel().addNew(this.pilotage_diapasonGrid());
    };

    this.add = function() {
        this.editPanel().saveData();
    };
            
    this.reset = function() {
        this.editPanel().loadData();
    };

    this.mainPanel = function(){
        if (pilotage_diapasonMainControl != null && !pilotage_diapasonMainControl.isDestroyed) {
            return  pilotage_diapasonMainControl;
        }
        pilotage_diapasonMainControl = new Ext.Panel({
            layout:"border",
            title:"PilotageDiapason",
            items:[this.gridPanel(),this.editPanel() ]
        });
        this.gridPanel().viewPanel =this.editPanel();
        this.editPanel().grid=this.pilotage_diapasonGrid();

        this.gridPanel().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });
        this.gridPanel().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });

        return pilotage_diapasonMainControl;
    };
            
    this.editPanel=function(){
        if (pilotage_diapasonEditControl != null && !pilotage_diapasonEditControl.isDestroyed) {
            return  pilotage_diapasonEditControl;
        }
        pilotage_diapasonEditControl = new Ext.FormPanel({
            region:"center",
            url:'/pilotage_diapasons',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                 { fieldLabel: 'from',name: 'from' }
,                { fieldLabel: 'to',name: 'to' }

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
        pilotage_diapasonEditControl.data = {};
        pilotage_diapasonEditControl.setEditable(false);
        return pilotage_diapasonEditControl;    
    }

    this.gridPanel=function(){
         if (pilotage_diapasonGridControl != null && !pilotage_diapasonGridControl.isDestroyed)
            return pilotage_diapasonGridControl;

        pilotage_diapasonGridControl = new Ext.grid.GridPanel(
        {
            title:"PilotageDiapasons",
            region:"north",
            store:this.pilotage_diapasonStore(),
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
                ,{ dataIndex: 'from', header: 'from'  }
                ,{ dataIndex: 'to', header: 'to'  }

            ]
        });
        return pilotage_diapasonGridControl;
    }
 
    this.pilotage_diapasonStore= function(){
       if (pilotage_diapasonStoreControl != null)
            return pilotage_diapasonStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/pilotage_diapasons'
        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, [
            { name: 'id', mapping: 'id' }
                 ,{ name: 'from' , type: 'int,' }
                ,{ name: 'to' , type: 'int' }

        ]);

        var writer = new Ext.data.JsonWriter();

        pilotage_diapasonStoreControl = new Ext.data.Store({
            restful: true,
            id: "pilotage_diapasons_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        pilotage_diapasonStoreControl.load();
        return pilotage_diapasonStoreControl; 
    }

}
