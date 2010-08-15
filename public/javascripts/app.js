Ext.BLANK_IMAGE_URL = '/javascripts/resources/images/default/s.gif';
var Currency = new Currencies();
var Dict = new Dicts();
var Vessel = new Vessels();
var Ports = new Ports();
var App = new Application();
var Proforma = new Proformas();
var Calc = new TarifCalculations();
var Tarif = new Tarifs();


function Application() {


    var currentpanel = new Ext.Panel({region:"center"});
    var mainPanel = null;

    this.showMainPanel = function(objStr) {
        var objPanel= Ext.decode(objStr);
        var newPanel=objPanel.getPanel();
        console.log(newPanel);
        switch (newPanel) {
            case "Vessel" :
                newPanel = Vessel.vesselPanel();
                console.log("vess");
                break;
            case "Ports" : newPanel = Vessel.vesselPanel(); break;
            case "Proforma" : newPanel = Proforma.mainPanel(); break;
            case "Configuration" : newPanel = IceClass.ice_classPanel(); break;
        }
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

        var tree = new Ext.tree.TreePanel({
            useArrows: true,
            autoScroll: true,
            animate: true,
            enableDD: true,
            containerScroll: true,
            border: false,
            id:"tree-panel",
            title:'Navigation',
            width:130,
            region:"west",
            collapsible:true,
            split:true,
            loader: new Ext.tree.TreeLoader({requestMethod :"GET", dataUrl: '/tree_elements'}),
            rootVisible:false,
            listeners: {
                click: function(n) {
                    App.showMainPanel(n.attributes.tag);
                    //Ext.Msg.alert('Navigation Tree Click', 'You clicked: "' + n.attributes.text + '"');
                }
            },
            root: {
                expanded: true,
                nodeType: 'async',
                text: 'Root',
                draggable: false,
                id: 'source'
            }
        });
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
                tree
            ]
        }
                );
    };

    var storesToLoad = [
        {
            store : "dict_store"
        },
        {
            store:Dict.storeCountryAll()
        },
        {
            store:Currency.currencyStore()
        },
		{
			store:Dict.ice_classStore()
		},
        {
			store:Dict.vesselTypeStore()
		},
        {
            store:Vessel.vesselStore()
        },
        {
            store:Ports.storeRest()
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