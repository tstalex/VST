function Proformas() {
    var proformaGridControl = null;
    var proformaEditControl = null;
    var proformaStoreControl = null;
    var proformaMainControl = null;
    var calcgrid = null;
    var tarifByPortStore = null;
    this.tarifHelper = new Ext.ux.ProfTarifHelper(this);
    //store that returns current tarifs set for the selected port
    this.tarifsByPort = function() {

        if (tarifByPortStore != null) {
            return tarifByPortStore;
        }
        var proxy = new Ext.data.HttpProxy({
            url: '/ports/tarifs'
        });
        var tarifRec = Ext.data.Record.create(
                [
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
                ]
                );

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, tarifRec);

        var writer = new Ext.data.JsonWriter();

        tarifByPortStore = new Ext.data.Store({
            restful: true,
            id: "proformas_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });

        var frm = this.editPanel().getForm();
        var item = frm.items.get("port_id");
        var port = -1;
        if (item) {
            port = item.getValue();
        }
        tarifByPortStore.load({params:{port_id:port}});
        return tarifByPortStore;
    }

    this.loadProfCalc = function() {
        var prof = new ProfTarifCalcs();
        prof.fillCalcStore(this.gridPanel(), this.calcGrid().store);
    }

    this.calcGrid = function()
    {
        if (calcgrid != null && !calcgrid.isDestroyed)
            return calcgrid;

        var editor = new Ext.ux.grid.RowEditor({
            saveText: 'Update'
        });

        var prof = new ProfTarifCalcs();
        var calcStore = new Ext.data.ArrayStore(
        {
            fields:[
                'id',
                'tarif_id',
                'proforma_id' ,
                'val' ]

        }
                );
        var fm = Ext.form;
        var combo = new fm.ComboBox({
            allowBlank: false,
            store: this.tarifsByPort(),
            displayField:'name',
            valueField: 'id',
            allowBlank: false,
            minChars: 2,
            hideTrigger: false,
            typeAhead: true,
            mode: 'local',
            triggerAction: 'all',
            emptyText: 'Select a tarif...',
            selectOnFocus: false
        });

        var cm = new Ext.grid.ColumnModel({
            // specify any defaults for each column
            defaults: {
                sortable: true // columns are not sortable by default
            },
            columns: [
                {
                    header: 'id',
                    dataIndex: 'id',
                    hidden:true,
                    editor: new fm.TextField({
                        allowBlank: false
                    })
                },
                {
                    header: 'Tarif',
                    dataIndex: 'tarif_id',
                    editor: combo,
                    renderer:Ext.ux.comboBoxRenderer(combo)
                },
                {
                    header: 'Value',
                    dataIndex: 'val',
                    editor: new fm.TextField()
                },
                {
                    header: 'Remark',
                    dataIndex: 'description',
                    editor: new fm.TextField()
                },
                {
                    header: 'Currency',
                    dataIndex: 'tarif_id',
                    editable:false,
                    renderer: Ext.ux.forignKeyRenderer(Currency.currencyStore(), combo.store, "currency_id", "curr")
                }

            ]
        });

        // create the editor grid
        calcgrid = new Ext.grid.EditorGridPanel({
            store: calcStore,
            cm: cm,
            frame: true,
            clicksToEdit: 1,
            controller:this,
            setReadOnly:function(isRo) {
                this.setPanelReadOnly(isRo);
                var bt = Proforma.calcGrid().getTopToolbar().items;
                if (!isRo) {
                    bt.get(0).enable();
                    bt.get(1).enable();
                    bt.get(2).enable();
                } else {
                    bt.get(0).disable();
                    bt.get(1).disable();
                    bt.get(2).disable();
                }
            }
            ,
            tbar: [
                {
                    text: 'Generate',
                    iconCls:"silk-image",
                    listeners:{
                        scope: this.tarifHelper,
                        'click': this.tarifHelper.generateTarifs
                    }
                },
                {
                    xtype:"tbseparator"
                },
                {
                    text: 'Add',
                    iconCls:"silk-add",
                    handler: function() {
                        var TarifObj = Proforma.calcGrid().store.recordType;
                        var newTarif = new TarifObj({
                            tarif_id:1,
                            val:0,
                            description:"Empty"
                        });
                        Proforma.calcGrid().store.insert(0, newTarif);
                        Proforma.calcGrid().getView().refresh();
                        Proforma.calcGrid().getSelectionModel().selectRow(0);
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    listeners:{
                        scope: this.tarifHelper,
                        'click': this.tarifHelper.generateTarifs
                    }
                }
                ,
                {
                    xtype:"tbseparator"
                }
            ]
        }
                )
                ;

        calcgrid.store.on("update", function(a, b, c) {
            Proforma.tarifHelper.calcTotal();
        });
        calcgrid.store.on("add", function(a, b, c) {
            Proforma.tarifHelper.calcTotal();
        });
        return calcgrid;
    }

    this.fail = function(resp, options) {
        Ext.MessageBox.alert("Error", "Server-side failure with status code " + resp.status);
    }

    this.del = function() {
        this.editPanel().deleteGridData(this.gridPanel());
    };

    this.edit = function() {
        this.editPanel().loadData();
        this.editPanel().setEditable(true);
        this.calcGrid().setReadOnly(false);

    };
	
	this.print=function(){
		var row= this.gridPanel().getSelectionModel().getSelected();
		if(!row)
			return;
		var id= row.get("id");
		var location="/print/xls/"+id;
		var ifr= new Ext.IframeWindow({
			iframe_id:"iframeid",
			width:640,
			height:480,
			title:"Knowledge Control Solutions Iframe Window Sample",
			src:location
		});
		ifr.show();
		iframeid.print();
	};
	
    this.newRow = function() {
        this.editPanel().addNew(this.gridPanel());
    };

    this.add = function() {
        this.editPanel().saveData();
    };

    this.reset = function() {
        this.editPanel().loadData();
    };

    this.mainPanel = function() {
        if (proformaMainControl != null && !proformaMainControl.isDestroyed) {
            return  proformaMainControl;
        }
        proformaMainControl = new Ext.Container({
            layout:"border",
            items:[this.gridPanel(),this.editPanel() ]
        });
        this.gridPanel().viewPanel = this.editPanel();
        this.editPanel().grid = this.gridPanel();

        this.gridPanel().getSelectionModel().on("rowselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadData();
            rsm.grid.controller.tarifHelper.handleProformaRowChanged();
            rsm.grid.controller.tarifHelper.calcTotal();


        });
        this.gridPanel().getSelectionModel().on("rowdeselect", function(rsm, rowIndex, e) {
            rsm.grid.viewPanel.loadData();
            rsm.grid.controller.tarifHelper.handleProformaRowChanged();
            rsm.grid.controller.tarifHelper.calcTotal();
        });

        return proformaMainControl;
    };

    this.editPanel = function() {
        if (proformaEditControl != null && !proformaEditControl.isDestroyed) {
            return  proformaEditControl;
        }
        proformaEditControl = new Ext.FormPanel({
            region:"center",
            url:'/proformas',
            frame:true,
            border:false,
            controller:this,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'container'},
            layout:"border",
            items: [
                {
                    region:"north",
                    layout:"column",
                    height:127,
                    split:true,
                    defaults:{xtype:"panel",layout:"form",columnWidth:.3},
                    items:[
                        {
                            items:[
                                new Ext.form.ComboBox({
                                    store: Vessel.vesselStore(),
                                    typeAhead: true,
                                    triggerAction: 'all',
                                    lazyRender:true,
                                    mode: 'local',
                                    valueField: 'id',
                                    displayField: 'name',
                                    fieldLabel: 'Vessel',
                                    forceSelection:true,
                                    name: 'vessel_id'
                                }),
                                new Ext.form.ComboBox({
                                    store: Ports.storeWithTarifs() ,
                                    triggerAction: 'all',
                                    typeAhead: false,
                                    forceSelection:true,
                                    mode: 'remote',
                                    valueField: 'id',
                                    displayField: 'name',
                                    fieldLabel: 'Port',
                                    name: 'port_id',
                                    listeners:{
                                        scope: Proforma,
                                        'select':   function(fld, record, indx) {
                                            this.tarifHelper.handlePortChanged();
                                        }
                                    }
                                }),
                                {
                                    fieldLabel: 'Estimated arrive',
                                    xtype:"datefield",
                                    name: 'estimated_arrive'
                                }
                                ,
                                {
                                    fieldLabel: 'Registration date',
                                    xtype:"datefield",
                                    name: 'registration_date'
                                },{
                                    fieldLabel:"Total",
                                    xtype:"textfield",
                                    readOnly:true,
                                    submitValue:false,
                                    labelStyle:"font-style: bold;",
                                    plugins:[new Ext.ux.InputTextMask("####-##")],
                                    name:"total_eur"
                                }
                            ]
                        },
                        {
                            items:[
                                {
                                    fieldLabel: 'Arrived at',
                                    xtype:"xdatetime",
                                    name: 'arrived'
                                },
                                {
                                    fieldLabel: 'Sailed at',
                                    xtype:"xdatetime",
                                    name: 'sailed'
                                },
                                {
                                    fieldLabel: 'GT',
                                    xtype:"textfield",
                                    name: 'gw'
                                },
                                {
                                    fieldLabel: 'calls',
                                    xtype:"textfield",
                                    name: 'calls'
                                },
                                {
                                    fieldLabel: 'Pilotage',
                                    xtype:"textfield",
                                    name: 'pilotage'
                                }
                            ]
                        },
                        {
                            items:[
                                new Ext.form.ComboBox({
                                    store: Dict.statusesStore() ,
                                    typeAhead: false,
                                    triggerAction: 'all',
                                    lazyRender:true,
                                    mode: 'local',
                                    valueField: 'id',
                                    displayField: 'name',
                                    fieldLabel: 'Status',
                                    forceSelection:true,
                                    emptyText:"Select status...",
                                    name: 'status'
                                })
                                ,
                                new Ext.form.ComboBox({
                                    store: Currency.currencyStore() ,
                                    typeAhead: true,
                                    triggerAction: 'all',
                                    lazyRender:true,
                                    mode: 'local',
                                    valueField: 'id',
                                    displayField: 'curr',
                                    forceSelection:true,
                                    fieldLabel: 'Currency',
                                    name: 'currency_id'
                                })
                                ,{
                                    fieldLabel: 'Date of rates',
                                    xtype:"datefield",
                                    name: 'date_curr'
                                } ,{
                                    fieldLabel: 'Passengers',
                                    xtype:"textfield",
                                    name: 'passengers'
                                }

                            ]
                        }

                    ]
                },
                {
                    region:"center",
                    height:600,
                    layout:"fit",
                    items:[this.calcGrid()]

                }

            ],

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
                        Proforma.calcGrid().setReadOnly(false);
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        btn.getFormPanel().controller.add();
                        Proforma.calcGrid().setReadOnly(true);
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        btn.getFormPanel().controller.reset();
                        Proforma.calcGrid().setReadOnly(true);
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        btn.getFormPanel().controller.del();
                        Proforma.calcGrid().setReadOnly(true);
                    }
                },
				{
                    text: 'Print',
                    iconCls:"silk-printer",
                    handler: function(btn, evnt) {
                        btn.getFormPanel().controller.print();
                    }
                }


            ]
        }
                )
                ;
        proformaEditControl.data = {};
        proformaEditControl.setEditable(false);
        this.calcGrid().setReadOnly(true)

        return proformaEditControl;
    }

    this.gridPanel = function() {
        if (proformaGridControl != null && !proformaGridControl.isDestroyed)
            return proformaGridControl;

        proformaGridControl = new Ext.grid.GridPanel(
        {
            title:"Proformas",
            region:"north",
            store:this.proformaStore(),
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
                    dataIndex: 'status',
                    header: 'Status',
                    renderer: Ext.ux.storeRenderer(Dict.statusesStore(), "name")
                }
                ,
                {
                    dataIndex: 'currency_id',
                    header: 'Currency',
                    renderer: Ext.ux.storeRenderer(Currency.currencyStore(), "curr")
                }
                ,
                {
                    dataIndex: 'date_curr',
                    header: 'Calc. date'
                }
                ,
                {
                    dataIndex: 'vessel_id',
                    header: 'Vessel',
                    renderer: Ext.ux.storeRenderer(Vessel.vesselStore(), "name")
                }
                ,
                {
                    dataIndex: 'port_id',
                    header: 'Port',
                    renderer: Ext.ux.storeRenderer(Ports.storeRest(), "name")
                }
                ,
                {
                    dataIndex: 'arrived',
                    header: 'Arrived at'
                }
                ,
                {
                    dataIndex: 'sailed',
                    header: 'Sailed at'
                }
                ,
                {
                    dataIndex: 'estimated_arrive',
                    header: 'ETA'
                }
                ,
                {
                    dataIndex: 'gw',
                    header: 'GT'
                }
                ,
                {
                    dataIndex: 'pilotage',
                    header: 'Pilotage',
					hidden:true
                }
                ,
                {
                    dataIndex: 'calls',
                    header: 'Calls'
                }
                ,
                {
                    dataIndex: 'registration_date',
                    header: 'registration_date',
					hidden:true
                }
            ]
        });
        return proformaGridControl;
    }

    this.proformaStore = function() {
        if (proformaStoreControl != null)
            return proformaStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/proformas'
        });
        var profRec = Ext.data.Record.create(
                [
                    {
                        name: 'id',
                        mapping: 'id'
                    }
                    ,
                    {
                        name: 'status' ,
                        type: 'int'
                    }
                    ,
                    {
                        name: 'currency_id' ,
                        type: 'int'
                    }
                    ,
                    {
                        name: 'date_curr' ,
                        type: 'date',
                        dateFormat: 'Y-m-d'
                    }
                    ,
                    {
                        name: 'vessel_id' ,
                        type: 'int'
                    }
                    ,
                    {
                        name: 'port_id' ,
                        type: 'int'
                    }
                    ,
                    {
                        name: 'arrived' ,
                        type: 'datetime'
                    }
                    ,
                    {
                        name: 'sailed' ,
                        type: 'datetime'
                    }
                    ,
                    {
                        name: 'estimated_arrive' ,
                        type: 'date',
                        dateFormat: 'Y-m-d'
                    }
                    ,
                    {
                        name: 'gw' ,
                        type: 'float'
                    }
                    ,
                    {
                        name: 'calls' ,
                        type: 'int'
                    }
                    ,
                    {
                        name: 'pilotage' ,
                        type: 'int'
                    }
                    ,
                    {
                        name:"passengers",
                        type:'int'
                    },
                    {
                        name: 'registration_date' ,
                        type: 'date',
                        dateFormat: 'Y-m-d'
                    }
                ]
                );

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, profRec);

        var writer = new Ext.data.JsonWriter({writeAllFields:true});

        proformaStoreControl = new Ext.data.Store({
            restful: true,
            id: "proformas_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                scope:this.tarifHelper,
                beforewrite: this.tarifHelper.beforeSaveProforma,
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        proformaStoreControl.load();
        return proformaStoreControl;
    }

}
