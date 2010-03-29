var Vessel= new Vessels();
function Vessels(){
    var vesselGridControl= null;
    var vesselEditControl=null;
    var vesselStoreControl=null;
    var vesselMainControl=null;


    this.del= function(){
        this.vesselEditPanel().deleteGridData(this.vesselGrid());
    };

    this.edit=function(){
        this.vesselEditPanel().loadGridData(this.vesselGrid());
        this.vesselEditPanel().setEditable(true);
    };
    this.newRow=function(){
        this.vesselEditPanel().addNew(this.vesselGrid());
    };

    this.add = function() {
        this.vesselEditPanel().saveGridSata(this.vesselGrid());
    };
            
    this.reset = function() {
        vesselEditPanel().loadGridData(this.vesselGrid());
    };

    this.vesselPanel = function(){
        if (vesselMainControl != null && !vesselMainControl.isDestroyed) {
            return  vesselMainControl;
        }
        vesselMainControl = new Ext.Panel({
            layout:"border",
            title:"Vessel",
            items:[this.vesselGrid(),this.vesselEditPanel() ]
        });
        this.vesselGrid().on("rowclick", function(grid, rowIndex, e) {
            Vessel.vesselEditPanel().loadGridData(grid);
        });
        return vesselMainControl;
    };
            
    this.vesselEditPanel=function(){
        if (vesselEditControl != null && !vesselEditControl.isDestroyed) {
            return  vesselEditControl;
        }
        vesselEditControl = new Ext.FormPanel({
            region:"center",
            url:'/vessels',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                 { fieldLabel: 'name',name: 'name' }
,                { fieldLabel: 'flag',name: 'flag' }
,                { fieldLabel: 'vesel_type',name: 'vesel_type' }
,                { fieldLabel: 'owner_id',name: 'owner_id' }
,                { fieldLabel: 'loa',name: 'loa' }
,                { fieldLabel: 'vessel_length',name: 'vessel_length' }
,                { fieldLabel: 'beam',name: 'beam' }
,                { fieldLabel: 'dw',name: 'dw' }
,                { fieldLabel: 'draft',name: 'draft' }
,                { fieldLabel: 'gross_tonnage',name: 'gross_tonnage' }
,                { fieldLabel: 'net_tonnage',name: 'net_tonnage' }
,                { fieldLabel: 'cap1',name: 'cap1' }
,                { fieldLabel: 'paxcap',name: 'paxcap' }
,                { fieldLabel: 'ice_class',name: 'ice_class' }
,                { fieldLabel: 'calls',name: 'calls' }
,                { fieldLabel: 'contact_info',name: 'contact_info' }
,                { fieldLabel: 'max_draft',name: 'max_draft' }
,                { fieldLabel: 'safety_cert_date',name: 'safety_cert_date' }
,                { fieldLabel: 'construction_cert_date',name: 'construction_cert_date' }
,                { fieldLabel: 'equipment_date',name: 'equipment_date' }
,                { fieldLabel: 'security_cert_date',name: 'security_cert_date' }
,                { fieldLabel: 'int_load_line_cert_date',name: 'int_load_line_cert_date' }
,                { fieldLabel: 'oil_pollut_prevent_date',name: 'oil_pollut_prevent_date' }
,                { fieldLabel: 'tonnage_cert_issued_date',name: 'tonnage_cert_issued_date' }
,                { fieldLabel: 'sanitation_contr_exempt_date',name: 'sanitation_contr_exempt_date' }

            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        Vessel.newRow();
                    }
                },{
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        Vessel.edit();
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        Vessel.add();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        Vessel.reset();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        Vessel.del();
                    }
                },


            ]
        }
                )
                ;
        vesselEditControl.data = {};
        vesselEditControl.setEditable(false);
        return vesselEditControl;    
    }

    this.vesselGrid=function(){
         if (vesselGridControl != null && !vesselGridControl.isDestroyed)
            return vesselGridControl;

        vesselGridControl = new Ext.grid.GridPanel(
        {
            title:"Vessels",
            region:"north",
            store:this.vesselStore(),
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
                ,{ dataIndex: 'flag', header: 'flag'  }
                ,{ dataIndex: 'vesel_type', header: 'vesel_type'  }
                ,{ dataIndex: 'owner_id', header: 'owner_id'  }
                ,{ dataIndex: 'loa', header: 'loa'  }
                ,{ dataIndex: 'vessel_length', header: 'vessel_length'  }
                ,{ dataIndex: 'beam', header: 'beam'  }
                ,{ dataIndex: 'dw', header: 'dw'  }
                ,{ dataIndex: 'draft', header: 'draft'  }
                ,{ dataIndex: 'gross_tonnage', header: 'gross_tonnage'  }
                ,{ dataIndex: 'net_tonnage', header: 'net_tonnage'  }
                ,{ dataIndex: 'cap1', header: 'cap1'  }
                ,{ dataIndex: 'paxcap', header: 'paxcap'  }
                ,{ dataIndex: 'ice_class', header: 'ice_class'  }
                ,{ dataIndex: 'calls', header: 'calls'  }
                ,{ dataIndex: 'contact_info', header: 'contact_info'  }
                ,{ dataIndex: 'max_draft', header: 'max_draft'  }
                ,{ dataIndex: 'safety_cert_date', header: 'safety_cert_date'  }
                ,{ dataIndex: 'construction_cert_date', header: 'construction_cert_date'  }
                ,{ dataIndex: 'equipment_date', header: 'equipment_date'  }
                ,{ dataIndex: 'security_cert_date', header: 'security_cert_date'  }
                ,{ dataIndex: 'int_load_line_cert_date', header: 'int_load_line_cert_date'  }
                ,{ dataIndex: 'oil_pollut_prevent_date', header: 'oil_pollut_prevent_date'  }
                ,{ dataIndex: 'tonnage_cert_issued_date', header: 'tonnage_cert_issued_date'  }
                ,{ dataIndex: 'sanitation_contr_exempt_date', header: 'sanitation_contr_exempt_date'  }

            ]
        });
        return vesselGridControl;
    }
 
    this.vesselStore= function(){
       if (vesselStoreControl != null)
            return vesselStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/vessels'
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
                ,{ name: 'flag' , type: 'int' }
                ,{ name: 'vesel_type' , type: 'int' }
                ,{ name: 'owner_id' , type: 'int' }
                ,{ name: 'loa' , type: 'float' }
                ,{ name: 'vessel_length' , type: 'float' }
                ,{ name: 'beam' , type: 'float' }
                ,{ name: 'dw' , type: 'float' }
                ,{ name: 'draft' , type: 'float' }
                ,{ name: 'gross_tonnage' , type: 'int' }
                ,{ name: 'net_tonnage' , type: 'int' }
                ,{ name: 'cap1' , type: 'int' }
                ,{ name: 'paxcap' , type: 'int' }
                ,{ name: 'ice_class' , type: 'int' }
                ,{ name: 'calls' , type: 'string' }
                ,{ name: 'contact_info' , type: 'string' }
                ,{ name: 'max_draft' , type: 'float' }
                ,{ name: 'safety_cert_date' , type: 'date', dateFormat: 'Y-m-d' }
                ,{ name: 'construction_cert_date' , type: 'date', dateFormat: 'Y-m-d' }
                ,{ name: 'equipment_date' , type: 'date', dateFormat: 'Y-m-d' }
                ,{ name: 'security_cert_date' , type: 'date', dateFormat: 'Y-m-d' }
                ,{ name: 'int_load_line_cert_date' , type: 'date', dateFormat: 'Y-m-d' }
                ,{ name: 'oil_pollut_prevent_date' , type: 'date', dateFormat: 'Y-m-d' }
                ,{ name: 'tonnage_cert_issued_date' , type: 'date', dateFormat: 'Y-m-d' }
                ,{ name: 'sanitation_contr_exempt_date' , type: 'date', dateFormat: 'Y-m-d' }

        ]);

        var writer = new Ext.data.JsonWriter();

        vesselStoreControl = new Ext.data.Store({
            restful: true,
            id: "vessels_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        vesselStoreControl.load();
        return vesselStoreControl; 
    }

}
