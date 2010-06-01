function Tarifs() {
    var tarifGridControl = null;
    var tarifEditControl = null;
    var tarifStoreControl = null;
    var tarifMainControl = null;

    var tarif_calculation_id = -1;
    var tarifCalculationField = new Ext.form.Hidden({
        name: 'tarif_calculation_id'
    });

    this.showModal = function(grid) {
        this.reloadStore(grid);
        modalWindow = new Ext.Window(
        {
            width:500,
            height:300,
            modal:true,
            plain: true,
            layout:'fit',
            items:[this.tarifPanel()]
        });
        tarifCalculationField.setValue(tarif_calculation_id);
        modalWindow.show();
    }

    this.del = function() {
        this.tarifEditPanel().deleteGridData(this.tarifGrid());
    };

    this.edit = function() {
        this.tarifEditPanel().loadData();
        this.tarifEditPanel().setEditable(true);
    };
    this.newRow = function() {
        this.tarifEditPanel().addNew(this.tarifGrid());
    };

    this.add = function() {
        this.tarifEditPanel().saveGridSata(this.tarifGrid());
    };

    this.reset = function() {
        tarifEditPanel().loadGridData(this.tarifGrid());
    };

    this.tarifPanel = function() {
        if (tarifMainControl != null && !tarifMainControl.isDestroyed) {
            return  tarifMainControl;
        }
        tarifMainControl = new Ext.Panel({
            layout:"border",
            items:[this.tarifGrid(),this.tarifEditPanel() ]
        });

        this.tarifGrid().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadData();
        });
        this.tarifGrid().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadData();
        });
        this.tarifGrid().viewPanel = this.tarifEditPanel();
        this.tarifEditPanel().grid = this.tarifGrid();

        return tarifMainControl;
    };

    this.tarifEditPanel = function() {
        if (tarifEditControl != null && !tarifEditControl.isDestroyed) {
            return  tarifEditControl;
        }
        tarifEditControl = new Ext.FormPanel({
            region:"center",
            url:'/tarifs',
            layout:"fit",
            controller:this,
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:false,border:false},
            items:{
                xtype:"panel",
                layout:"border",
                defaults:{labelWidth:110, xtype:"panel",layout:"form",bodyBorder :false,frame:false,border:false},
                items: [
                    {
                        region:"north",
                        autoHeight:true,
                        items:[
                            tarifCalculationField,
                            {
                                xtype:"container",
                                layout:"column",
                                items:[
                                    {
                                        xtype:"container",
                                        layout:"form",
                                        items:{
                                            xtype:"textfield",
                                            fieldLabel: 'Name',
                                            name: 'name'
                                        }
                                    }
                                    ,
                                    {
                                        xtype:"container",
                                        layout:"form",
                                        items:new Ext.form.ComboBox({
                                            store: Currency.currencyStore(),
                                            typeAhead: true,
                                            triggerAction: 'all',
                                            lazyRender:true,
                                            mode: 'local',
                                            valueField: 'id',
                                            displayField: 'curr',
                                            fieldLabel: 'Currency',
                                            forceSelection:true,
                                            name: 'currency_id'
                                        })
                                    }
                                    ,
                                ]
                            },
                            {
                                xtype:"container",
                                layout:"column",
                                items:[
                                    {
                                        xtype:"container",
                                        layout:"form",
                                        columnWidth:.6,
                                        items:[
                                            {
                                                fieldLabel: 'Remark',
                                                xtype:"textfield",
                                                name: 'remark'
                                            }
                                        ]
                                    },
                                    {
                                        xtype:"container",
                                        layout:"form",
                                        columnWidth:.4,
                                        items:[
                                            {
                                                fieldLabel: 'Calculated manually',
                                                xtype:"checkbox",
                                                name: 'is_manual'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        region:"center",
                        xtype:"fieldset",
                        title:"Formula",
                        layout:"fit",
                        border:true,
                        items:[
                            {
                                fieldLabel: 'Formula',
                                name: 'formula',
                                xtype:"textarea"

                            }
                        ]
                    }
                ]
            }
            ,

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        btn.getFormPanel().controller.newRow();
                    }
                },
                {
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
        tarifEditControl.data = {};
        tarifEditControl.setEditable(false);
        return tarifEditControl;
    }

    this.tarifGrid = function() {
        if (tarifGridControl != null && !tarifGridControl.isDestroyed)
            return tarifGridControl;

        tarifGridControl = new Ext.grid.GridPanel(
        {
            title:"Tarifs",
            region:"north",
            store:this.tarifStore(),
            collapsible:true,
            split:true,
            controller:this,
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
                    dataIndex: 'tarif_calculation_id',
                    header: 'tarif_calculation_id',
                    hidden:true
                }
                ,
                {
                    dataIndex: 'name',
                    header: 'Name'
                }
                ,
                {
                    dataIndex: 'is_manual',
                    header: 'manual',
                    renderer:Ext.ux.boolRenderer()
                }
                ,
                {
                    dataIndex: 'formula',
                    header: 'formula',
                    hidden:true
                },
                {
                    dataIndex: 'currency_id',
                    header: 'Currency',
                    renderer:Ext.ux.storeRenderer(Currency.currencyStore(), "curr")
                }

            ]
        });
        return tarifGridControl;
    }

    this.reloadStore = function(ds) {
        var rec = ds.getSelectionModel().getSelected();
        tarif_calculation_id = (rec) ? rec.get("id") : -1;
        this.tarifStore().load({params:{tarif_calculation_id:tarif_calculation_id}});
    }

    this.tarifStore = function() {
        if (tarifStoreControl != null)
            return tarifStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/tarifs'
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
                name: 'tarif_calculation_id' ,
                type: 'int'
            }
            ,
            {
                name: 'name' ,
                type: 'string'
            }
            ,
            {
                name: 'is_manual' ,
                type: 'boolean'
            }
            ,
            {
                name: 'formula' ,
                type: 'string'
            },
            {
                name:"remark",
                type:"string"
            },
            {
                name:"currency_id",
                type:"int"
            }

        ]);

        var writer = new Ext.data.JsonWriter();

        tarifStoreControl = new Ext.data.Store({
            restful: true,
            id: "tarifs_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        return tarifStoreControl;
    }

}
