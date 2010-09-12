var User= new Users();
function Users(){
    var userGridControl= null;
    var userEditControl=null;
    var userStoreControl=null;
    var userMainControl=null;


    this.del= function(){
        this.editPanel().deleteGridData(this.userGrid());
    };

    this.edit=function(){
        this.editPanel().loadData();
        this.editPanel().setEditable(true);
    };
    this.newRow=function(){
        this.editPanel().addNew(this.userGrid());
    };

    this.add = function() {
        this.editPanel().saveData();
    };
            
    this.reset = function() {
        this.editPanel().loadData();
    };

    this.mainPanel = function(){
        if (userMainControl != null && !userMainControl.isDestroyed) {
            return  userMainControl;
        }
        userMainControl = new Ext.Container({
            layout:"border",
            items:[this.gridPanel(),this.editPanel() ]
        });
        this.gridPanel().viewPanel =this.editPanel();
        this.editPanel().grid=this.userGrid();

        this.gridPanel().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });
        this.gridPanel().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });

        return userMainControl;
    };
            
    this.editPanel=function(){
        if (userEditControl != null && !userEditControl.isDestroyed) {
            return  userEditControl;
        }
        userEditControl = new Ext.FormPanel({
            region:"center",
            url:'/users',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                 { fieldLabel: 'login',name: 'login' }
,                { fieldLabel: 'pwd',name: 'pwd' }
,                { fieldLabel: 'role',name: 'role' }

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
        userEditControl.data = {};
        userEditControl.setEditable(false);
        return userEditControl;    
    }

    this.gridPanel=function(){
         if (userGridControl != null && !userGridControl.isDestroyed)
            return userGridControl;

        userGridControl = new Ext.grid.GridPanel(
        {
            title:"Users",
            region:"north",
            store:this.userStore(),
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
                ,{ dataIndex: 'login', header: 'login'  }
                ,{ dataIndex: 'pwd', header: 'pwd'  }
                ,{ dataIndex: 'role', header: 'role'  }

            ]
        });
        return userGridControl;
    }
 
    this.userStore= function(){
       if (userStoreControl != null)
            return userStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/users'
        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, [
            { name: 'id', mapping: 'id' }
                 ,{ name: 'login' , type: 'text' }
                ,{ name: 'pwd' , type: 'text' }
                ,{ name: 'role' , type: 'int' }

        ]);

        var writer = new Ext.data.JsonWriter();

        userStoreControl = new Ext.data.Store({
            restful: true,
            id: "users_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        userStoreControl.load();
        return userStoreControl; 
    }

}
