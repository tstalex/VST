function Ports() {
    var storeRestControl = null;
    var portGridControl = null;
    var portMainControl = null;
    var editPanelControl = null;
    this.showTarif = function(record) {
        var modal = new Ext.Window(
        {
            width:500,
            height:300,
            plain: true,
            layout:'fit',
            items:[Tarif.tarifPanel()]
        });
        modal.show();
    }

    this.add = function() {
        this.editPanel().saveGridSata(this.portGrid());
    }

    this.del = function() {
        this.editPanel().deleteGridData(this.portGrid());
    };

    this.edit = function() {
        this.editPanel().loadGridData(this.portGrid());
        this.editPanel().setEditable(true);
    };
    this.newRow = function() {
        this.editPanel().addNew(this.portGrid());
    };


    this.reset = function() {
        this.editPanel().resetData(this.portGrid());
    };


    this.showPanel = function(country_id) {
        this.filter_country=country_id;
        this.portGrid().store.clearFilter();
        console.log("filtring by "+country_id);

        this.portGrid().store.filterBy(function(rec,country_id){
            
            var t_country_id=rec.get("country");
            if(t_country_id==this.filter_country ||this.filter_country <0 ){
                return true;
            }
            return false;
        },this);
        console.log("Applied filter " + this.portGrid().store.isFiltered());
        return this.portsPanel();
    }

    this.portsPanel = function() {
        if (portMainControl != null && !portMainControl.isDestroyed) {
            return  portMainControl;
        }
        this.portGrid().viewPanel=this.editPanel();
        this.editPanel().grid=this.portGrid();
        portMainControl = new Ext.Panel({
            layout:"border",
            title:"Ports",
            items:[this.portGrid(),this.editPanel() ]
        });

        this.portGrid().getSelectionModel().on("rowselect", function(obj, rowIndex, row) {
            Ports.editPanel().loadGridData(Ports.portGrid());
            Calc.reloadStore(Ports.portGrid());
        });
        this.portGrid().getSelectionModel().on("rowdeselect", function(obj, rowIndex, row) {
            Ports.editPanel().loadGridData(Ports.portGrid());
            Calc.reloadStore(Ports.portGrid());
        });

        return portMainControl;
    };

    this.editPanel = function() {

        if (editPanelControl != null && !editPanelControl.isDestroyed) {
            return  editPanelControl;
        }

        editPanelControl = new Ext.FormPanel({
            region:"center",
            url:'/ports',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false},
            width:600,
            layout:"fit",
            items:[
                new Ext.TabPanel({
                    activeItem:0,
                    items: [
                        {
                            title:"Port data",
                            frame:true,
                            border:false,
                            bodyBorder :false,
                            items:[
                                new Ext.Panel({
                                    width:550,
                                    layout:"column",
                                    items:[
                                        {
                                            layout:"form",
                                            columnWidth:.5,
                                            items:[
                                                {
                                                    xtype:'textfield',
                                                    fieldLabel: 'Code',
                                                    name: 'code',
                                                    anchor:'90%'
                                                },
                                                new Ext.form.ComboBox({
                                                    store: Dict.storeCountryAll() ,
                                                    typeAhead: true,
                                                    triggerAction: 'all',
                                                    lazyRender:true,
                                                    mode: 'local',
                                                    valueField: 'id',
                                                    displayField: 'text',
                                                    fieldLabel: 'Country',
                                                    name: 'country'
                                                })
                                            ]
                                        },
                                        {
                                            layout:"form",
                                            columnWidth:.5,
                                            items:[
                                                {
                                                    xtype:'textfield',
                                                    fieldLabel: 'Name',
                                                    name: 'name',
                                                    anchor:'95%'
                                                },
                                                new Ext.form.ComboBox({
                                                    store: Dict.storeCountryAll() ,
                                                    typeAhead: true,
                                                    triggerAction: 'all',
                                                    lazyRender:true,
                                                    mode: 'local',
                                                    valueField: 'id',
                                                    displayField: 'text',
                                                    fieldLabel: 'Flag',
                                                    name: 'flag'
                                                })
                                            ]
                                        }
                                    ]
                                })
                                ,
                                new Ext.form.HtmlEditor({
                                    fieldLabel: 'Description',
                                    name: 'description',
                                    width:550
                                })
                            ]
                        }
                            ,
                        {
                            title:"Tarif information",
                            layout:"fit",
                            items:[Calc.tarif_calculationGrid(Ports.portGrid())]
                        }
                    ]
                })
            ]
            ,

            bbar: [
                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        Ports.newRow();
                    }
                },
                {
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        Ports.edit();
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        Ports.add();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        Ports.reset();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        Ports.del();
                    }
                }


            ]
        }
                )
                ;
        editPanelControl.data = {};
        editPanelControl.setEditable(false);
        return editPanelControl;
    }

    this.portGrid = function() {
        if (portGridControl != null && !portGridControl.isDestroyed)
            return portGridControl;

        portGridControl = new Ext.grid.GridPanel(
        {
            title:"Ports",
            region:"north",
            store:this.storeRest(),
            collapsible:true,
            split:true,
            height:300,
            columns:[
                {
                    id:"id",
                    header:"#",
                    dataIndex:"id",
                    sortable:true,
                    hidden:true
                },
                {
                    header: "Code",
                    dataIndex: 'code',
                    sortable: true
                },
                {
                    header: "Name",
                    dataIndex: 'name',
                    sortable: true,
                    id:"name"
                },
                {
                    header: "Description",
                    dataIndex: 'description',
                    sortable: true
                },
                {
                    header:"Country",
                    dataIndex:"country",
                    sortable:true,
                    hidden:false,
                    renderer:function(value){
                        var rec=Dict.storeCountry().getById(value);
                        if(rec){
                            return rec.get("text");
                        }else{
                            return "Empty "+value;
                        }
                    }
                 }
            ]
        });
        return portGridControl;
    }

    this.storeRest = function() {
        if (storeRestControl != null)
            return storeRestControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/ports'
        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, [
            {
                name: 'id'
            },
            {
                name: 'name',
                allowBlank: false
            },
            {
                name: 'country',
                allowBlank: false
            },
            {
                name: 'code',
                allowBlank: false
            },
            {
                name: 'flag',
                allowBlank: false
            },
            {
                name: 'tips',
                allowBlank: true
            },
            {
                name: 'description',
                allowBlank: true
            },
            {
                name: 'picture',
                allowBlank: true
            },
        ]);

        var writer = new Ext.data.JsonWriter();

        storeRestControl = new Ext.data.Store({
            restful: true,
            id: "port_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        storeRestControl.load();
        return storeRestControl;
    }

    this.tarifs = function(tarif_calc_id) {

        var tg = Tarif.tarifPanel();
        return tg;
    }
}