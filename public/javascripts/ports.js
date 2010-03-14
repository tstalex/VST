function Ports() {
    var storeRestControl = null;
    var portGridControl = null;
    var portMainControl = null;
    var editPanelControl = null;
    this.add = function() {
        this.editPanel().saveGridSata(this.portGrid());
    }
    this.reset = function() {
        Ports.editPanel().loadGridData(this.portGrid());

    }

    this.showPanel = function(country_id) {
        if (this.portGrid().store.isFiltered()) {
            console.log("Removing filter");
            this.portGrid().store.clearFilter();
            console.log(this.portGrid().store.isFiltered());
        }

        this.portGrid().store.filter("country_id", country_id);
        console.log("Applied filter " + this.portGrid().store.isFiltered());
        return this.portsPanel();
    }

    this.portsPanel = function() {
        if (portMainControl != null && !portMainControl.isDestroyed) {
            return  portMainControl;
        }
        portMainControl = new Ext.Panel({
            layout:"border",
            title:"Ports",
            items:[this.portGrid(),this.editPanel() ]
        });
        this.portGrid().on("rowclick", function(grid, rowIndex, e) {
            Ports.editPanel().loadGridData(grid);
        });
        return portMainControl;
    };

    this.editPanel = function() {

        if (editPanelControl != null && !editPanelControl.isDestroyed) {
            return  editPanelControl;
        }

        console.log("creating new editPanelControl");
        editPanelControl = new Ext.FormPanel({
            region:"center",
            url:'/ports',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false},
            width:600,
            layout:"fit",
            items: [
                new Ext.TabPanel(
                {
                    activeTab:0,
                    items:[
                        {
                            title:"Port data",
                            frame:true,
                            border:false,
                            bodyBorder :false,
                            items:[
                                new Ext.Panel({
                                    width:480,
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
                                                {

                                                    xtype:'textfield',
                                                    fieldLabel: 'Country',
                                                    name: 'country_id',
                                                    anchor:'90%'
                                                }
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
                                                {
                                                    xtype:'textfield',
                                                    fieldLabel: 'Flag',
                                                    name: 'flag',
                                                    anchor:'95%'
                                                }
                                            ]
                                        }
                                    ]
                                })
                                ,
                                new Ext.form.HtmlEditor({
                                    fieldLabel: 'Description',
                                    name: 'description',
                                    width:480
                                })
                            ]
                        }
                       ,
                        {title:"Tarifs",items:[{title:"Some data"}]}
                    ]
                }
                        )


            ],

            buttons: [
                {
                    text: 'Save',
                    handler: function(btn, evnt) {
                        Ports.add();
                    }
                },
                {
                    text: 'Cancel',
                    handler: function(btn, evnt) {
                        Ports.reset();
                    }
                }
            ]
        }
                )
                ;
        editPanelControl.data = {};

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
                    dataIndex:"country_id",
                    sortable:true,
                    hidden:false
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
                name: 'country_id',
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
    };


}