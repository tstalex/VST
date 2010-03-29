var Post= new Posts();
function Posts(){
    var postGridControl= null;
    var postEditControl=null;
    var postStoreControl=null;
    var postMainControl=null;


    this.del= function(){
        this.postEditPanel().deleteGridData(this.postGrid());
    };

    this.edit=function(){
        this.postEditPanel().loadGridData(this.postGrid());
        this.postEditPanel().setEditable(true);
    };
    this.newRow=function(){
        this.postEditPanel().addNew(this.postGrid());
    };

    this.add = function() {
        this.postEditPanel().saveGridSata(this.postGrid());
    };
            
    this.reset = function() {
        postEditPanel().loadGridData(this.postGrid());
    };

    this.postPanel = function(){
        if (postMainControl != null && !postMainControl.isDestroyed) {
            return  postMainControl;
        }
        postMainControl = new Ext.Panel({
            layout:"border",
            title:"Post",
            items:[this.postGrid(),this.postEditPanel() ]
        });
        this.postGrid().on("rowclick", function(grid, rowIndex, e) {
            Post.postEditPanel().loadGridData(grid);
        });
        return postMainControl;
    };
            
    this.postEditPanel=function(){
        if (postEditControl != null && !postEditControl.isDestroyed) {
            return  postEditControl;
        }
        console.log("new edit");
        postEditControl = new Ext.FormPanel({
            region:"center",
            url:'/posts',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                 { fieldLabel: 'name',name: 'name' }
,                { fieldLabel: 'val',name: 'val' }
,                { fieldLabel: 'val1',name: 'val1' }
,                { fieldLabel: 'name2',name: 'name2' }

            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        Post.newRow();
                    }
                },{
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        Post.edit();
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        Post.add();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        Post.reset();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        Post.del();
                    }
                },


            ]
        }
                )
                ;
        postEditControl.data = {};
        postEditControl.setEditable(false);
        return postEditControl;    
    }

    this.postGrid=function(){
         if (postGridControl != null && !postGridControl.isDestroyed)
            return postGridControl;

        postGridControl = new Ext.grid.GridPanel(
        {
            title:"Posts",
            region:"north",
            store:this.postStore(),
            collapsible:true,
            split:true,
            rest:true,
            restful: true, 
            columns:[
                {
                    id:"id",
                    header:"#",
                    dataIndex:"id",
                    sortable:true,
                    hidden:true
                }
                ,{ dataIndex: 'name', header: 'name'  }
                ,{ dataIndex: 'val', header: 'val'  }
                ,{ dataIndex: 'val1', header: 'val1'  }
                ,{ dataIndex: 'name2', header: 'name2'  }

            ]
        });
        return postGridControl;
    }
 
    this.postStore= function(){
       if (postStoreControl != null)
            return postStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/posts'
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
                ,{ name: 'val' , type: 'int' }
                ,{ name: 'val1' , type: 'int' }
                ,{ name: 'name2' , type: 'string' }

        ]);

        var writer = new Ext.data.JsonWriter();

        postStoreControl = new Ext.data.Store({
            restful: true,
            id: "posts_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        postStoreControl.load();
        return postStoreControl; 
    }

}
