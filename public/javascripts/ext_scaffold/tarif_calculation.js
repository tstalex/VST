//var TarifCalculation = new TarifCalculations();
function _TarifCalculations() {
    var tarif_calculationGridControl = null;
    var tarif_calculationEditControl = null;
    var tarif_calculationStoreControl = null;
    var tarif_calculationMainControl = null;


    this.del = function() {
        this.tarif_calculationEditPanel().deleteGridData(this.tarif_calculationGrid());
    };

    this.edit = function() {
        this.tarif_calculationEditPanel().loadGridData(this.tarif_calculationGrid());
        this.tarif_calculationEditPanel().setEditable(true);
    };
    this.newRow = function() {
        this.tarif_calculationEditPanel().addNew(this.tarif_calculationGrid());
    };

    this.add = function() {
        this.tarif_calculationEditPanel().saveGridSata(this.tarif_calculationGrid());
    };

    this.reset = function() {
        tarif_calculationEditPanel().loadGridData(this.tarif_calculationGrid());
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
        this.tarif_calculationGrid().viewPanel =this.tarif_calculationEditPanel();
        this.tarif_calculationEditPanel.grid=this.tarif_calculationGrid();
        this.tarif_calculationGrid().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadData();
        });
        this.tarif_calculationGrid().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadData();
        });

        return tarif_calculationMainControl;
    };

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
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                {
                    fieldLabel: 'from',
                    name: 'from'
                }
                ,
                {
                    fieldLabel: 'to',
                    name: 'to'
                }
                ,
                {
                    fieldLabel: 'active',
                    name: 'active'
                }
                ,
                {
                    fieldLabel: 'notes',
                    name: 'notes'
                }

            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        TarifCalculation.newRow();
                    }
                },
                {
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        TarifCalculation.edit();
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        TarifCalculation.add();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        TarifCalculation.reset();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        TarifCalculation.del();
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

    this.tarif_calculationGrid = function(portDatasource) {
        
        this.tarif_calculationStore().filter(portDatasource);

        if (tarif_calculationGridControl != null && !tarif_calculationGridControl.isDestroyed)
            return tarif_calculationGridControl;

        tarif_calculationGridControl = new Ext.grid.GridPanel(
        {
            title:"TarifCalculations",
            region:"north",
            store:this.tarif_calculationStore(),
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
                    dataIndex: 'from',
                    header: 'from'
                }
                ,
                {
                    dataIndex: 'to',
                    header: 'to'
                }
                ,
                {
                    dataIndex: 'active',
                    header: 'active'
                }
                ,
                {
                    dataIndex: 'notes',
                    header: 'notes'
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
        tarif_calculationStoreControl.load();
        return tarif_calculationStoreControl;
    }

}
