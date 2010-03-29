var VesselType= new VesselTypes();
function VesselTypes(){
    var vessel_typeGridControl= null;
    var vessel_typeEditControl=null;
    var vessel_typeStoreControl=null;
    var vessel_typeMainControl=null;


    this.del= function(){
        this.vessel_typeEditPanel().deleteGridData(this.vessel_typeGrid());
    };

    this.edit=function(){
        this.vessel_typeEditPanel().loadGridData(this.vessel_typeGrid());
        this.vessel_typeEditPanel().setEditable(true);
    };
    this.newRow=function(){
        this.vessel_typeEditPanel().addNew(this.vessel_typeGrid());
    };

    this.add = function() {
        this.vessel_typeEditPanel().saveGridSata(this.vessel_typeGrid());
    };
            
    this.reset = function() {
        vessel_typeEditPanel().loadGridData(this.vessel_typeGrid());
    };

    this.vessel_typePanel = function(){
        if (vessel_typeMainControl != null && !vessel_typeMainControl.isDestroyed) {
            return  vessel_typeMainControl;
        }
        vessel_typeMainControl = new Ext.Panel({
            layout:"border",
            title:"VesselType",
            items:[this.vessel_typeGrid(),this.vessel_typeEditPanel() ]
        });
        this.vessel_typeGrid().on("rowclick", function(grid, rowIndex, e) {
            VesselType.vessel_typeEditPanel().loadGridData(grid);
        });
        return vessel_typeMainControl;
    };
            
    this.vessel_typeEditPanel=function(){
        if (vessel_typeEditControl != null && !vessel_typeEditControl.isDestroyed) {
            return  vessel_typeEditControl;
        }
        vessel_typeEditControl = new Ext.FormPanel({
            region:"center",
            url:'/vessel_types',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                 { fieldLabel: 'name',name: 'name' }
,                { fieldLabel: 'code',name: 'code' }

            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        VesselType.newRow();
                    }
                },{
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        VesselType.edit();
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        VesselType.add();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        VesselType.reset();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        VesselType.del();
                    }
                },


            ]
        }
                )
                ;
        vessel_typeEditControl.data = {};
        vessel_typeEditControl.setEditable(false);
        return vessel_typeEditControl;    
    }

    this.vessel_typeGrid=function(){
         if (vessel_typeGridControl != null && !vessel_typeGridControl.isDestroyed)
            return vessel_typeGridControl;

        vessel_typeGridControl = new Ext.grid.GridPanel(
        {
            title:"VesselTypes",
            region:"north",
            store:this.vessel_typeStore(),
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
                ,{ dataIndex: 'code', header: 'code'  }

            ]
        });
        return vessel_typeGridControl;
    }
 
    this.vessel_typeStore= function(){
       if (vessel_typeStoreControl != null)
            return vessel_typeStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/vessel_types'
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
                ,{ name: 'code' , type: 'string' }

        ]);

        var writer = new Ext.data.JsonWriter();

        vessel_typeStoreControl = new Ext.data.Store({
            restful: true,
            id: "vessel_types_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        vessel_typeStoreControl.load();
        return vessel_typeStoreControl; 
    }

}
