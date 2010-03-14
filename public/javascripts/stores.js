var storesToLoad = [
    {
        store : 'countriesStore',
        url : '/countries'
    }
];
var doThisAfterAllStoresAreLoaded = Ext.app.App.buildLayout;

Ext.app.App.loadStartupStores = function(record, options, success) {
    var task = storesToLoad.shift();  //From the top
    if (task) {
        if (success !== false) {
            task.callback = arguments.callee 
            var store = Ext.StoreMgr.lookup(task.store);
            store ? store.load(task) : complain('bad store specified');
        } else {
            complain();
        }
    } else {
        doThisAfterAllStoresAreLoaded();
    }
};
Ext.app.App.loadStartupStores();