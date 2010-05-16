function Dicts() {

    var countryStoreRestControl = null;
    var countriesGridControl = null;
    var countryAllStoreRestControl = null;
    var vessel_typeStoreControl = null;
    var ice_classStoreControl = null;

    var statusesStoreControl = null;

    //proforma statuses
    this.statusesStore = function() {
        if (statusesStoreControl != null) {
            return statusesStoreControl;
        }
        statusesStoreControl = new Ext.data.ArrayStore({
            // store configs
            autoDestroy: true,
            storeId: 'myStore',
            idIndex: 0,
            fields: [
                'id',
                 'name'
            ]
        });

        var myData = [
            [0,'Estimation'],
            [1,'Proforma'],
            [2,'Final DA']
        ];
        statusesStoreControl.loadData(myData);
        return statusesStoreControl;
    }

    this.ice_classStore = function() {
        if (ice_classStoreControl != null)
            return ice_classStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/ice_classes'
        });

        var reader = new Ext.data.JsonReader({
            rest:true,
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
                name: 'code' ,
                type: 'string'
            }

        ]);

        var writer = new Ext.data.JsonWriter();

        ice_classStoreControl = new Ext.data.Store({
            restful: true,
            id: "ice_classs_stored",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        return ice_classStoreControl;
    }

    this.countriesGrid = function() {
        if (countriesGridControl != null) {
            return countriesGridControl;
        }
        countriesGridControl = new Ext.grid.GridPanel(
        {
            border:false,
            store: this.storeCountry(),
            columns: [
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
                    sortable: true,
                    hidden:true
                },
                {
                    header: "Name",
                    dataIndex: 'text',
                    sortable: true,
                    id:"name"
                }
            ],
            autoExpandColumn:"name",
            autoScroll:false

        }

                );

        this.storeCountry().load();
        return countriesGridControl;
    }

    this.storeCountry = function() {
        if (countryStoreRestControl != null)
            return countryStoreRestControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/countries/with_ports'
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
                name: 'text',
                allowBlank: false
            },
            {
                name: 'code',
                allowBlank: false
            }
        ]);

        countryStoreRestControl = new Ext.data.Store({
            restful: true,
            storeId : "dict_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: new Ext.data.JsonWriter()
        });

        return countryStoreRestControl;
    };

    this.storeCountryAll = function() {
        if (countryAllStoreRestControl != null)
            return countryAllStoreRestControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/countries'
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
                name: 'text',
                allowBlank: false
            },
            {
                name: 'code',
                allowBlank: false
            }
        ]);

        var writer = new Ext.data.JsonWriter();

        countryAllStoreRestControl = new Ext.data.Store({
            restful: true,
            storeId : "country_storse",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        countryAllStoreRestControl.load();
        return countryAllStoreRestControl;
    }

    this.vesselTypeStore = function() {
        if (vessel_typeStoreControl != null)
            return vessel_typeStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/vessel_types'
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
                name: 'code' ,
                type: 'string'
            }

        ]);

        var writer = new Ext.data.JsonWriter();

        vessel_typeStoreControl = new Ext.data.Store({
            restful: true,
            id: "vessel_types_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        vessel_typeStoreControl.load();
        return vessel_typeStoreControl;
    }

    this.storeCountry();
    this.storeCountryAll();
}