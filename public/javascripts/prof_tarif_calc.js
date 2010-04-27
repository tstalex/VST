function ProfTarifCalcs(){
    var proforma_id=0;
    var prof_tarif_calcGridControl= null;
    var prof_tarif_calcStoreControl=null;
    var profCalcRecord= [
            { name: 'id', mapping: 'id' }
                 ,{ name: 'tarif_id' , type: 'int' }
                ,{ name: 'proforma_id' , type: 'int' }
                ,{ name: 'val' , type: 'float' }

        ];
    this.fillCalcStore = function(ds,profcalcStore) {

        var rec = ds.getSelectionModel().getSelected();
        proforma_id = (rec) ? rec.get("id") : -1;
        this.store().on("load",function(a,row,c){
            profcalcStore.add(row);
        });
        this.store().load({params:{proforma_id:proforma_id}});
    }

    this.gridPanel=function(){
         if (prof_tarif_calcGridControl != null && !prof_tarif_calcGridControl.isDestroyed)
            return prof_tarif_calcGridControl;

        prof_tarif_calcGridControl = new Ext.grid.GridPanel(
        {
            title:"ProfTarifCalcs",
            region:"north",
            store:this.store(),
            split:true,
            columns:[
                {
                    id:"id",
                    header:"#",
                    dataIndex:"id",
                    sortable:true,
                    hidden:true
                }
                ,{ dataIndex: 'tarif_id', header: 'tarif_id' , hidden:true }
                ,{ dataIndex: 'proforma_id', header: 'proforma_id', hidden:true  }
                ,{ dataIndex: 'val', header: 'val'  }

            ]
        });
        return prof_tarif_calcGridControl;
    }
 
    this.store= function(){
       if (prof_tarif_calcStoreControl != null)
            return prof_tarif_calcStoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/prof_tarif_calcs'
        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, profCalcRecord);

        var writer = new Ext.data.JsonWriter();

        prof_tarif_calcStoreControl = new Ext.data.Store({
            restful: true,
            id: "prof_tarif_calcs_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        return prof_tarif_calcStoreControl; 
    }

}
