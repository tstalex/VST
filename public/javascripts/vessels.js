function Vessels() {
    var vesselGridControl = null;
    var vesselEditControl = null;
    var vesselStoreControl = null;
    var vesselMainControl = null;


    this.del = function() {
        this.vesselEditPanel().deleteGridData(this.vesselGrid());
    };

    this.edit = function() {
        this.vesselEditPanel().loadGridData(this.vesselGrid());
        this.vesselEditPanel().setEditable(true);
    };
    this.newRow = function() {
        this.vesselEditPanel().addNew(this.vesselGrid());
    };

    this.add = function() {
        this.vesselEditPanel().saveGridSata(this.vesselGrid());
    };

    this.reset = function() {
        this.vesselEditPanel().resetData(this.vesselGrid());
    };

    this.vesselPanel = function() {
        if (vesselMainControl != null && !vesselMainControl.isDestroyed) {
            return  vesselMainControl;
        }
        vesselMainControl = new Ext.Container({
            layout:"border",
            items:[this.vesselGrid(),this.vesselEditPanel() ]
        });
        this.vesselGrid().getSelectionModel().on("rowselect", function(obj, rowIndex, row) {
            Vessel.vesselEditPanel().loadGridData(Vessel.vesselGrid());
        });
        this.vesselGrid().getSelectionModel().on("rowdeselect", function(obj, rowIndex, row) {
            Vessel.vesselEditPanel().loadGridData(Vessel.vesselGrid());
        });
        return vesselMainControl;
    };

    this.vesselEditPanel = function() {
        if (vesselEditControl != null && !vesselEditControl.isDestroyed) {
            return  vesselEditControl;
        }

        var countryCombo = new Ext.form.ComboBox({
            store: Dict.storeCountryAll() ,
            typeAhead: true,
            triggerAction: 'all',
            lazyRender:true,
            mode: 'local',
            valueField: 'id',
            displayField: 'text',
            fieldLabel: 'Flag',
            name: 'flag'
        });


        var vesselTypeCombo = new Ext.form.ComboBox({
            store: Dict.vesselTypeStore() ,
            typeAhead: true,
            triggerAction: 'all',
            lazyRender:true,
            mode: 'local',
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Vessel type',
            name: 'vessel_type'
        });
        var iceClassCombo = new Ext.form.ComboBox({
            store: Dict.ice_classStore() ,
            typeAhead: true,
            triggerAction: 'all',
            lazyRender:true,
            mode: 'local',
            valueField: 'id',
            displayField: 'code',
            fieldLabel: 'Ice class',
            name: 'ice_class_id'
        });
        vesselEditControl = new Ext.FormPanel({
            region:"center",
            url:'/vessels',
            frame:true,
            border:false,
            bodyBorder :false,
            items: [

                {
                    xtype:"fieldset",
                    layout:"column",
                    defaults:{labelWidth:150, bodyBorder :false,frame:false,border:false,xtype:'textfield'},
                    items:[
                        {
                            xtype:"panel",
                            columnWidth:.3,
                            layout:"form",
                            defaults:{xtype:'textfield'},
                            items:[
                                {
                                    fieldLabel: 'Vessel',
                                    name: 'name'
                                },
                                countryCombo,
                                {
                                    fieldLabel: 'loa',
                                    name: 'loa'
                                }
                                ,
                                {
                                    fieldLabel: 'Length',
                                    name: 'vessel_length'
                                }
                                ,
                                {
                                    fieldLabel: 'beam',
                                    name: 'beam'
                                }
                                ,
                                {
                                    fieldLabel: 'dw',
                                    name: 'dw'
                                }
                                ,
                                {
                                    fieldLabel: 'draft',
                                    name: 'draft'
                                },
                                {
                                    xtype:"datefield",
                                    fieldLabel: 'Tonnage cert. issued',
                                    name: 'tonnage_cert_issued_date'
                                }

                            ]
                        },
                        {
                            xtype:"panel",
                            columnWidth:.3,
                            layout:"form",
                            defaults:{xtype:'textfield'},
                            items:[
                                vesselTypeCombo
                                ,
                                {
                                    xtype:"textfield",
                                    fieldLabel: 'Shipowner',
                                    name: 'owner_id'
                                },
                                {
                                    fieldLabel: 'calls',
                                    name: 'calls'
                                }
                                ,
                                {
                                    fieldLabel: 'Contact info',
                                    name: 'contact_info'
                                }
                                ,
                                {
                                    fieldLabel: 'max draft',
                                    name: 'max_draft'
                                }
                                ,
                                {
                                    xtype:"datefield",
                                    fieldLabel: 'Safety certificate',
                                    name: 'safety_cert_date'
                                }
                                ,
                                {
                                    xtype:"datefield",
                                    fieldLabel: 'Safety construct. cert. date',
                                    name: 'construction_cert_date'
                                },{
                                    fieldLabel: 'Sanitation contr. exempt date',
                                    name: 'sanitation_contr_exempt_date'
                                }
                            ]
                        },
                        {
                            xtype:"panel",
                            columnWidth:.3,
                            layout:"form",
                            defaults:{xtype:'textfield'},
                            items:[
                                {
                                    fieldLabel: 'Gross tonnage',
                                    name: 'gross_tonnage'
                                }
                                ,
                                {
                                    fieldLabel: 'Net tonnage',
                                    name: 'net_tonnage'
                                }
                                ,
                                {
                                    fieldLabel: 'paxcap',
                                    name: 'paxcap'
                                }
                                ,
                                iceClassCombo
                                ,
                                {
                                    fieldLabel: 'Safety equipment cert. date',
                                    name
                                            :
                                            'equipment_date'
                                }
                                ,
                                {
                                    fieldLabel: 'Security cert. date',
                                    name
                                            :
                                            'security_cert_date'
                                }
                                ,
                                {
                                    fieldLabel: 'Load line cert. date',
                                    name
                                            :
                                            'int_load_line_cert_date'
                                }
                                ,
                                {
                                    fieldLabel: 'Oil pollut. prevent cert. date',
                                    name
                                            :
                                            'oil_pollut_prevent_date'
                                }
                            ]
                        }
                    ]

                }


            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        Vessel.newRow();
                    }
                },
                {
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
                }


            ]
        }
                )
                ;
        vesselEditControl.data = {};
        vesselEditControl.setEditable(false);
        return vesselEditControl;
    }

    this.vesselGrid = function() {
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
                ,
                {
                    dataIndex: 'name',
                    header: 'name'
                }
                ,
                {
                    dataIndex: 'flag',
                    header: 'flag',
					renderer: Ext.ux.storeRenderer(Dict.storeCountryAll(), "text")
                }
                ,
                {
                    dataIndex: 'vessel_type',
                    header: 'vessel_type',
					renderer: Ext.ux.storeRenderer(Dict.vesselTypeStore(), "name")
                }
                ,
                {
                    dataIndex: 'owner_id',
                    header: 'owner_id',
					hidden:true
                }
                ,
                {
                    dataIndex: 'loa',
                    header: 'loa'
                }
                ,
                {
                    dataIndex: 'vessel_length',
                    header: 'vessel_length'
                }
                ,
                {
                    dataIndex: 'beam',
                    header: 'beam'
                }
                ,
                {
                    dataIndex: 'dw',
                    header: 'dw'
                }
                ,
                {
                    dataIndex: 'draft',
                    header: 'draft'
                }
                ,
                {
                    dataIndex: 'gross_tonnage',
                    header: 'gross_tonnage'
                }
                ,
                {
                    dataIndex: 'net_tonnage',
                    header: 'net_tonnage'
                }
                ,
                {
                    dataIndex: 'cap1',
                    header: 'cap1'
                }
                ,
                {
                    dataIndex: 'paxcap',
                    header: 'paxcap'
                }
                ,
                {
                    dataIndex: 'ice_class_id',
                    header: 'ice_class',
					renderer: Ext.ux.storeRenderer(Dict.ice_classStore(), "code")
                }
                ,
                {
                    dataIndex: 'calls',
                    header: 'calls',
					hidden:true
                }
                ,
                {
                    dataIndex: 'contact_info',
                    header: 'contact_info'
                }
                ,
                {
                    dataIndex: 'max_draft',
                    header: 'max_draft'
                }
                ,
                {
                    dataIndex: 'safety_cert_date',
                    header: 'safety_cert_date',
					hidden:true
                }
                ,
                {
                    dataIndex: 'construction_cert_date',
                    header: 'construction_cert_date',
					hidden:true
                }
                ,
                {
                    dataIndex: 'equipment_date',
                    header: 'equipment_date',
					hidden:true
                }
                ,
                {
                    dataIndex: 'security_cert_date',
                    header: 'security_cert_date',
					hidden:true
                }
                , 
                {
                    dataIndex: 'int_load_line_cert_date',
                    header: 'int_load_line_cert_date',
					hidden:true
                }
                ,
                {
                    dataIndex: 'oil_pollut_prevent_date',
                    header: 'oil_pollut_prevent_date',
					hidden:true
                }
                ,
                {
                    dataIndex: 'tonnage_cert_issued_date',
                    header: 'tonnage_cert_issued_date',
					hidden:true
                }
                ,
                {
                    dataIndex: 'sanitation_contr_exempt_date',
                    header: 'sanitation_contr_exempt_date',
					hidden:true
                }

            ]
        });
        return vesselGridControl;
    }

    this.vesselStore = function() {
        if (vesselStoreControl != null)
            return vesselStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/vessels',
            restful:true

        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, [
            {
                name: 'id',
                mapping: 'id'
            }
            ,
            {
                name: 'name' ,
                type: 'string'
            }
            ,
            {
                name: 'flag' ,
                type: 'int'
            }
            ,
            {
                name: 'vessel_type' ,
                type: 'int'
            }
            ,
            {
                name: 'owner_id' ,
                type: 'int'
            }
            ,
            {
                name: 'loa' ,
                type: 'float'
            }
            ,
            {
                name: 'vessel_length' ,
                type: 'float'
            }
            ,
            {
                name: 'beam' ,
                type: 'float'
            }
            ,
            {
                name: 'dw' ,
                type: 'float'
            }
            ,
            {
                name: 'draft' ,
                type: 'float'
            }
            ,
            {
                name: 'gross_tonnage' ,
                type: 'int'
            }
            ,
            {
                name: 'net_tonnage' ,
                type: 'int'
            }
            ,
            {
                name: 'cap1' ,
                type: 'int'
            }
            ,
            {
                name: 'paxcap' ,
                type: 'int'
            }
            ,
            {
                name: 'ice_class_id' ,
                type: 'int'
            }
            ,
            {
                name: 'calls' ,
                type: 'string'
            }
            ,
            {
                name: 'contact_info' ,
                type: 'string'
            }
            ,
            {
                name: 'max_draft' ,
                type: 'float'
            }
            ,
            {
                name: 'safety_cert_date' ,
                type: 'date',
                dateFormat: 'Y-m-d'
            }
            ,
            {
                name: 'construction_cert_date' ,
                type: 'date',
                dateFormat: 'Y-m-d'
            }
            ,
            {
                name: 'equipment_date' ,
                type: 'date',
                dateFormat: 'Y-m-d'
            }
            ,
            {
                name: 'security_cert_date' ,
                type: 'date',
                dateFormat: 'Y-m-d'
            }
            ,
            {
                name: 'int_load_line_cert_date' ,
                type: 'date',
                dateFormat: 'Y-m-d'
            }
            ,
            {
                name: 'oil_pollut_prevent_date' ,
                type: 'date',
                dateFormat: 'Y-m-d'
            }
            ,
            {
                name: 'tonnage_cert_issued_date' ,
                type: 'date',
                dateFormat: 'Y-m-d'
            }
            ,
            {
                name: 'sanitation_contr_exempt_date' ,
                type: 'date',
                dateFormat: 'Y-m-d'
            }

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
