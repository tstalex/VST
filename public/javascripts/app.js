var Currency= new Currencies();
var Dict = new Dicts();
var App = new Application();
var Proforma= new Proformas();
var Calc = new TarifCalculations();
var Ports = new Ports();
var Vessel = new Vessels();
var Tarif = new Tarifs();

function Application() {


    var currentpanel = new Ext.Panel({region:"center"});
    var mainPanel = null;

    this.showMainPanel = function(newPanel) {
        if (currentpanel == newPanel)
            return;
        var center = Ext.getCmp('center_panel');
        center.remove(currentpanel);
        center.add(newPanel);
        center.getLayout().setActiveItem(newPanel);
        center.doLayout();
        currentpanel = newPanel;
    }
    this.countriesPanel = function() {
        var ret = {
            xtype:"panel",
            layout:"fit",
            title:"Ports", items:[Dict.countriesGrid()]};

        Dict.countriesGrid().on("rowclick", function(grid, rowIndex, e) {
            var rec = grid.store.getAt(rowIndex);
            var country_id = rec.data.id;
            var grid = Ports.showPanel(country_id);
            App.showMainPanel(grid);
        });


        return  ret;
    }

    this.buildLayout = function() {
        var treePanel = new Ext.Panel(
        {
            id:"tree-panel",
            title:'Navigation',
            width:130,
            region:"west",
            layout:"accordion",
            collapsible:true,
            activeItem:3,
            items: [
                this.countriesPanel(),
                {
                    title: 'Vessels',
                    html: '<p><a href="#" onclick="App.showMainPanel(Vessel.vesselPanel())">Show</a></p>'
                },{
                    title: 'Configuration',
                    html: '<p><a href="#" onclick="App.showMainPanel(IceClass.ice_classPanel())">Ice classes</a></p><p><a href="#" onclick="App.showMainPanel(Currency.mainPanel())">Currencies</a></p>'
                },{
                    title:"Proforma",
                    html: '<p><a href="#" onclick="App.showMainPanel(Proforma.mainPanel())">Proforma</a></p>'
                }
            ],
            split:true
        }
                );
        mainPanel = new Ext.Viewport(
        {
            id:'main-panel',
            layout:'border',
            renderTo:"main",
            items:[
                {
                    id:"center_panel",
                    region:"center",
                    layout:"card",
                    items:[currentpanel]
                }
                ,
                treePanel
            ]
        }
                );
    };

    var storesToLoad = [
        {
            store : "dict_store"
        },
        {
            store:"country_storse"
        },
        {
            store:Currency.currencyStore()
        }
    ];

    this.start = function(record, options, success) {
        var task = storesToLoad.shift();  //From the top
        if (task) {
            if (success !== false) {
                task.callback = arguments.callee
                var store = Ext.StoreMgr.lookup(task.store);
                store ? store.load(task) : console.log('bad store specified ' + task.store);
            } else {
                console.log(" Store loaded " + task.store);
            }
        } else {
            App.buildLayout();
        }
    };
}