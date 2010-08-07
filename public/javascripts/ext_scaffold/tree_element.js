var TreeElement= new TreeElements();
function TreeElements(){
    var tree_elementGridControl= null;
    var tree_elementEditControl=null;
    var tree_elementStoreControl=null;
    var tree_elementMainControl=null;


    this.del= function(){
        this.editPanel().deleteGridData(this.tree_elementGrid());
    };

    this.edit=function(){
        this.editPanel().loadData();
        this.editPanel().setEditable(true);
    };
    this.newRow=function(){
        this.editPanel().addNew(this.tree_elementGrid());
    };

    this.add = function() {
        this.editPanel().saveData();
    };
            
    this.reset = function() {
        this.editPanel().loadData();
    };

    this.mainPanel = function(){
        if (tree_elementMainControl != null && !tree_elementMainControl.isDestroyed) {
            return  tree_elementMainControl;
        }
        tree_elementMainControl = new Ext.Panel({
            layout:"border",
            title:"TreeElement",
            items:[this.gridPanel(),this.editPanel() ]
        });
        this.gridPanel().viewPanel =this.editPanel();
        this.editPanel().grid=this.tree_elementGrid();

        this.gridPanel().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });
        this.gridPanel().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });

        return tree_elementMainControl;
    };
            
    this.editPanel=function(){
        if (tree_elementEditControl != null && !tree_elementEditControl.isDestroyed) {
            return  tree_elementEditControl;
        }
        tree_elementEditControl = new Ext.FormPanel({
            region:"center",
            url:'/tree_elements',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                 { fieldLabel: 'name',name: 'name' }
,                { fieldLabel: 'tag',name: 'tag' }
,                { fieldLabel: 'parent_id',name: 'parent_id' }
,                { fieldLabel: 'sort_ordrt',name: 'sort_ordrt' }

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
        tree_elementEditControl.data = {};
        tree_elementEditControl.setEditable(false);
        return tree_elementEditControl;    
    }

    this.gridPanel=function(){
         if (tree_elementGridControl != null && !tree_elementGridControl.isDestroyed)
            return tree_elementGridControl;

        tree_elementGridControl = new Ext.grid.GridPanel(
        {
            title:"TreeElements",
            region:"north",
            store:this.tree_elementStore(),
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
                ,{ dataIndex: 'parent_id', header: 'parent_id'  }
                ,{ dataIndex: 'sort_ordrt', header: 'sort_ordrt'  }

            ]
        });
        return tree_elementGridControl;
    }
 
    this.tree_elementStore= function(){
       if (tree_elementStoreControl != null)
            return tree_elementStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/tree_elements'
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
                ,{ name: 'tag' , type: 'text' }
                ,{ name: 'parent_id' , type: 'int' }
                ,{ name: 'sort_ordrt' , type: 'int' }

        ]);

        var writer = new Ext.data.JsonWriter();

        tree_elementStoreControl = new Ext.data.Store({
            restful: true,
            id: "tree_elements_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        tree_elementStoreControl.load();
        return tree_elementStoreControl; 
    }

}
