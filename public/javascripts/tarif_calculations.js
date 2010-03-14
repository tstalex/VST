function Calculation() {
    var gridControl=null;
    var editControl=null;
    var storeRestControl=null;

    this.add=function(editpanel)     {
        var u = new storeRestControl.recordType(
            {
                   "calc_date":"2010-02-21",
                    "created_at":"2010-02-21T12:49:54Z",
                    "name":"one",
                    "notes":"xxx",
                    "updated_at":"2010-02-21T12:49:54Z"}
            );
        storeRestControl.add(u);
        console.log("is valid "+u.isValid());
    };

    this.drawPanel = function() {
        grid = Calc.grid();
        grid.store.load();
        return grid;
    };
    this.grid = function() {
        if(gridControl!=null)
            return gridControl;
        // create the grid
        gridControl = new Ext.grid.GridPanel({
            bbar:[
                {text:"New",handler: function(b, e) {
                    win = new Ext.Window({title:"New calculation",items:[Calc.editPanel()]});
                    win.show();
                } }
            ] ,
            title:"Tarif calculations",
            region:"center",
            store: Calc.storeRest(),
            columns: [
                {header: "Name", width: 120, dataIndex: 'name', sortable: true},
                {header: "Creation date", width: 180, dataIndex: 'calc_date', sortable: true},
                {header: "Notes", width: 115, dataIndex: 'notes', sortable: true}
            ]
        });
        return gridControl;
    };

    this.storeRest = function() {
        if(storeRestControl!=null)
            return storeRestControl;
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
            {name: 'id'},
            {name: 'calc_date', allowBlank: true},
            {name: 'name', allowBlank: true},
            {name: 'created_at', allowBlank: true},
            {name: 'notes', allowBlank: true},
            {name: 'updated_at', allowBlank: true}
        ]);

        var writer = new Ext.data.JsonWriter();

        storeRestControl = new Ext.data.Store({
            restful: true, 
            id: "tarif_calculation",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                     Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer    // <-- plug a DataWriter into the store just as you would a Reader
        });
        return storeRestControl;
    };

    this.editPanel = function() {
        var editPanel = new Ext.FormPanel(
        {
            labelWidth: 100,
            url:'/tarif_calculations/save',
            frame:true,
            width: 450,
            defaults: {width: 230},
            items: [
                {
                    fieldLabel: 'Name',
                    name: 'name'
                },
                {
                    fieldLabel: 'Notes',
                    name: 'notes'
                },
                new Ext.form.DateField({
                    fieldLabel: 'Calculation date',
                    name: 'calc_date'
                })
            ],

            defaultType: 'textfield',

            buttons: [
                {
                    text: 'Save',
                    handler: function(btn,evnt){
                      Calc.add(editPanel);  
                    }
                },
                {
                    text: 'Cancel'
                }
            ]
        }
                );
        return editPanel;
    };
}