function TarifCalculations() {
    var tarif_calculationGridControl = null;
    var tarif_calculationEditControl = null;
    var tarif_calculationStoreControl = null;
    var tarif_calculationMainControl = null;
    var port = null;
    var modalWindow = null;
    this.showModal = function(panel) {
        modalWindow = new Ext.Window(
        {
            width:500,
            height:300,
            plain: true,
            layout:'fit',
            items:[panel]


        });
        portField.setValue(port);
        modalWindow.show();
    }


    this.del = function() {
        this.tarif_calculationEditPanel().deleteGridData(this.tarif_calculationGrid());
    };

    this.edit = function() {
        this.tarif_calculationEditPanel().loadGridData(this.tarif_calculationGrid());
        this.tarif_calculationEditPanel().setEditable(true);
        this.showModal(this.tarif_calculationEditPanel());
    };
    this.newRow = function() {
        this.tarif_calculationEditPanel().addNew(this.tarif_calculationGrid());
        this.showModal(this.tarif_calculationEditPanel());
    };

    this.add = function() {
        this.tarif_calculationEditPanel().saveGridSata(this.tarif_calculationGrid());
        modalWindow.close();
    };

    this.reset = function() {
        tarif_calculationEditPanel().loadGridData(this.tarif_calculationGrid());
        modalWindow.close();
    };

    this.tarif_calculationPanel = function() {
        if (tarif_calculationMainControl != null && !tarif_calculationMainControl.isDestroyed) {
            return  tarif_calculationMainControl;
        }
        tarif_calculationMainControl = new Ext.Panel({
            layout:"border",
            title:"TarifCalculation",
            items:[this.tarif_calculationGrid(),this.tarif_calculationEditPanel() ]
        });
        this.tarif_calculationGrid().viewPanel = this.tarif_calculationEditPanel();
        this.tarif_calculationEditPanel.grid = this.tarif_calculationGrid();
        this.tarif_calculationGrid().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadData();
        });
        this.tarif_calculationGrid().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadData();
        });

        return tarif_calculationMainControl;
    };

    var portField= new Ext.form.TextField({
                    fieldLabel:"port",
                    name:"port_id"
                }) ;
    this.tarif_calculationEditPanel = function() {
        if (tarif_calculationEditControl != null && !tarif_calculationEditControl.isDestroyed) {
            return  tarif_calculationEditControl;
        }
        tarif_calculationEditControl = new Ext.FormPanel({
            region:"center",
            url:'/tarif_calculations',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:false,border:false},

            items: [
                {
                    xtype:"fieldset",
                    layout:"hbox",
                    defaults:{layout:"form", bodyBorder :false,frame:false,border:false,xtype:'panel'},
                    items:[

                        {
                            items:[
                                {
                                    fieldLabel: 'from',
                                    xtype:"datefield",
                                    name: 'from'
                                }
                            ]
                        }
                        ,
                        {
                            items:[
                                {
                                    fieldLabel: 'to',
                                    xtype:"datefield",
                                    name: 'to'
                                }
                            ]
                        }

                    ]
                }
                ,
                new Ext.form.HtmlEditor({
                    fieldLabel: 'Notes',
                    name: 'notes',
                    width:250
                }),
                portField
            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        Calc.newRow();
                    }
                },
                {
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        Calc.edit();
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        Calc.add();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        Calc.reset();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        Calc.del();
                    }
                },


            ]
        }
                )
                ;
        tarif_calculationEditControl.data = {};
        tarif_calculationEditControl.setEditable(false);
        return tarif_calculationEditControl;
    }

    this.reloadStore = function(ds) {
        var rec = ds.getSelectionModel().getSelected();
        port = (rec) ? rec.get("id") : -1;
        this.tarif_calculationStore().load({params:{port_id:port}});
    }

    this.tarif_calculationGrid = function(ds) {
        if (tarif_calculationGridControl != null && !tarif_calculationGridControl.isDestroyed)
            return tarif_calculationGridControl;
        var rec = ds.getSelectionModel().getSelected();
        var port_id = (rec) ? rec.get("id") : -1;
        this.tarif_calculationStore().load({params:{port_id:port_id}});

        tarif_calculationGridControl = new Ext.grid.GridPanel(
        {
            title:"TarifCalculations",
            region:"north",
            store:this.tarif_calculationStore(),
            collapsible:true,
            split:true,
            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        Calc.newRow();
                    }
                },
                {
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        Calc.edit();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        Calc.del();
                    }
                },
                {
                    text: 'Tarif',
                    iconCls:"silk-application",
                    handler: function(btn, evnt) {
                        var t= new Tarifs();
                        t.showModal(Calc.tarif_calculationGrid())
                    }
                }

            ],
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
                    dataIndex: 'from',
                    header: 'from',
                    dateFormat: 'Y-m-d'
                }
                ,
                {
                    dataIndex: 'to',
                    header: 'to',
                     dateFormat: 'Y-m-d'
                }
                ,
                {
                    dataIndex: 'notes',
                    header: 'notes'
                },
                {
                    dataIndex: 'port_id',
                    header: 'port',
                    hidden:true
                }

            ]
        });
        return tarif_calculationGridControl;
    }

    this.tarif_calculationStore = function() {
        if (tarif_calculationStoreControl != null)
            return tarif_calculationStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/tarif_calculations'
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
                name: 'from' ,
                type: 'date',
                dateFormat: 'Y-m-d'
            }
            ,
            {
                name: 'to' ,
                type: 'date',
                dateFormat: 'Y-m-d'
            }
            ,
            {
                name: 'active' ,
                type: 'boolean'
            }
            ,
            {
                name: 'notes' ,
                type: 'string'
            },
            {
                name: 'port_id' ,
                type: 'int'
            }

        ]);

        var writer = new Ext.data.JsonWriter();

        tarif_calculationStoreControl = new Ext.data.Store({
            restful: true,
            id: "tarif_calculations_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
       
        return tarif_calculationStoreControl;
    }

}
