function Dicts() {

    var countryStoreRestControl = null;
    var countriesGridControl = null;

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

        var writer = new Ext.data.JsonWriter();

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
            writer: writer
        });
        console.log("Creating store " + countryStoreRestControl.storeId);
        return countryStoreRestControl;
    };

    this.storeCountry();
}