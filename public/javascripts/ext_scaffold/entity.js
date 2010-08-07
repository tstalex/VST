var Entity= new Entities();
function Entities(){
    var entityGridControl= null;
    var entityEditControl=null;
    var entityStoreControl=null;
    var entityMainControl=null;


    this.del= function(){
        this.editPanel().deleteGridData(this.entityGrid());
    };

    this.edit=function(){
        this.editPanel().loadData();
        this.editPanel().setEditable(true);
    };
    this.newRow=function(){
        this.editPanel().addNew(this.entityGrid());
    };

    this.add = function() {
        this.editPanel().saveData();
    };
            
    this.reset = function() {
        this.editPanel().loadData();
    };

    this.mainPanel = function(){
        if (entityMainControl != null && !entityMainControl.isDestroyed) {
            return  entityMainControl;
        }
        entityMainControl = new Ext.Panel({
            layout:"border",
            title:"Entity",
            items:[this.gridPanel(),this.editPanel() ]
        });
        this.gridPanel().viewPanel =this.editPanel();
        this.editPanel().grid=this.entityGrid();

        this.gridPanel().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });
        this.gridPanel().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });

        return entityMainControl;
    };
            
    this.editPanel=function(){
        if (entityEditControl != null && !entityEditControl.isDestroyed) {
            return  entityEditControl;
        }
        entityEditControl = new Ext.FormPanel({
            region:"center",
            url:'/entities',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                 { fieldLabel: 'name',name: 'name' }
,                { fieldLabel: 'tag',name: 'tag' }
,                { fieldLabel: 'parent_entity_id',name: 'parent_entity_id' }

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
        entityEditControl.data = {};
        entityEditControl.setEditable(false);
        return entityEditControl;    
    }

    this.gridPanel=function(){
         if (entityGridControl != null && !entityGridControl.isDestroyed)
            return entityGridControl;

        entityGridControl = new Ext.grid.GridPanel(
        {
            title:"Entities",
            region:"north",
            store:this.entityStore(),
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
                ,{ dataIndex: 'tag', header: 'tag'  }
                ,{ dataIndex: 'parent_entity_id', header: 'parent_entity_id'  }

            ]
        });
        return entityGridControl;
    }
 
    this.entityStore= function(){
       if (entityStoreControl != null)
            return entityStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/entities'
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
                ,{ name: 'tag' , type: 'string' }
                ,{ name: 'parent_entity_id' , type: 'int' }

        ]);

        var writer = new Ext.data.JsonWriter();

        entityStoreControl = new Ext.data.Store({
            restful: true,
            id: "entities_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        entityStoreControl.load();
        return entityStoreControl; 
    }

}
