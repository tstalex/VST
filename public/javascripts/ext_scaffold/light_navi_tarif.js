var LightNaviTarif= new LightNaviTarifs();
function LightNaviTarifs(){
    var light_navi_tarifGridControl= null;
    var light_navi_tarifEditControl=null;
    var light_navi_tarifStoreControl=null;
    var light_navi_tarifMainControl=null;


    this.del= function(){
        this.editPanel().deleteGridData(this.light_navi_tarifGrid());
    };

    this.edit=function(){
        this.editPanel().loadData();
        this.editPanel().setEditable(true);
    };
    this.newRow=function(){
        this.editPanel().addNew(this.light_navi_tarifGrid());
    };

    this.add = function() {
        this.editPanel().saveData();
    };
            
    this.reset = function() {
        this.editPanel().loadData();
    };

    this.mainPanel = function(){
        if (light_navi_tarifMainControl != null && !light_navi_tarifMainControl.isDestroyed) {
            return  light_navi_tarifMainControl;
        }
        light_navi_tarifMainControl = new Ext.Panel({
            layout:"border",
            title:"LightNaviTarif",
            items:[this.gridPanel(),this.editPanel() ]
        });
        this.gridPanel().viewPanel =this.editPanel();
        this.editPanel().grid=this.light_navi_tarifGrid();

        this.gridPanel().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });
        this.gridPanel().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadGridData();
        });

        return light_navi_tarifMainControl;
    };
            
    this.editPanel=function(){
        if (light_navi_tarifEditControl != null && !light_navi_tarifEditControl.isDestroyed) {
            return  light_navi_tarifEditControl;
        }
        light_navi_tarifEditControl = new Ext.FormPanel({
            region:"center",
            url:'/light_navi_tarifs',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                 { fieldLabel: 'gt',name: 'gt' }
,                { fieldLabel: 'lighthouse',name: 'lighthouse' }
,                { fieldLabel: 'navi',name: 'navi' }

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
        light_navi_tarifEditControl.data = {};
        light_navi_tarifEditControl.setEditable(false);
        return light_navi_tarifEditControl;    
    }

    this.gridPanel=function(){
         if (light_navi_tarifGridControl != null && !light_navi_tarifGridControl.isDestroyed)
            return light_navi_tarifGridControl;

        light_navi_tarifGridControl = new Ext.grid.GridPanel(
        {
            title:"LightNaviTarifs",
            region:"north",
            store:this.light_navi_tarifStore(),
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
                ,{ dataIndex: 'gt', header: 'gt'  }
                ,{ dataIndex: 'lighthouse', header: 'lighthouse'  }
                ,{ dataIndex: 'navi', header: 'navi'  }

            ]
        });
        return light_navi_tarifGridControl;
    }
 
    this.light_navi_tarifStore= function(){
       if (light_navi_tarifStoreControl != null)
            return light_navi_tarifStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/light_navi_tarifs'
        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, [
            { name: 'id', mapping: 'id' }
                 ,{ name: 'gt' , type: 'int' }
                ,{ name: 'lighthouse' , type: 'decimal' }
                ,{ name: 'navi' , type: 'decimal' }

        ]);

        var writer = new Ext.data.JsonWriter();

        light_navi_tarifStoreControl = new Ext.data.Store({
            restful: true,
            id: "light_navi_tarifs_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        light_navi_tarifStoreControl.load();
        return light_navi_tarifStoreControl; 
    }

}
