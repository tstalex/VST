Ext.namespace("Ext.ux");

Ext.ux.ProfTarifHelper = function(proforma){

    this.handleProformaRowChanged=function(){
        this.handlePortChanged();
        this.fillProfTarifs();
    }

    this.fillProfTarifs=function() {
        var prof = new ProfTarifCalcs();
        proforma.calcGrid().store.removeAll(true);
        prof.fillCalcStore(proforma.gridPanel(), proforma.calcGrid().store);
    }

    this.generateTarifs=function() {
        var data =  proforma.gridPanel().getSelectionModel().getSelected().data;
        console.log(this);
        Ext.Ajax.request({
            url: '/prof_tarif_calcs/gen_tarifs',
            success: this.loadGeneratedCalc,
            method:"POST",
            failure: proforma.fail,
            params: { data: Ext.util.JSON.encode(data)}
        });
    }

    this.loadGeneratedCalc=function(resp, opts){
        var obj = Ext.decode(resp.responseText);
        proforma.calcGrid().store.removeAll(true);
        var recordType = Ext.data.Record.create([
            {
                name: 'id',
                mapping: 'id'
            }
            ,
            {
                name: 'tarif_id' ,
                type: 'int'
            }
            ,
            {
                name: 'proforma_id' ,
                type: 'int'
            }
            ,
            {
                name: 'val' ,
                type: 'float'
            },
            {
                name: 'description' ,
                type: 'string'
            }

        ]);
        // create new record
        for (var i = 0; i < obj.data.length; i++) {
            var TarifObj = proforma.calcGrid().store.recordType;
            var newTarif = new TarifObj({
                tarif_id:obj.data[i].tarif_id,
                val:obj.data[i].val,
                description:obj.data[i].description 
            });

            proforma.calcGrid().store.insert(0,newTarif);
        }
        //proforma.calcGrid().store.save();
        console.log("generated "+proforma.calcGrid().store.getCount());

    }

    this.handlePortChanged=function() {
        var el= proforma.editPanel().getFieldByName("port_id");
        var newVal = el.getValue();
        proforma.tarifsByPort().removeAll(true);
        if(newVal)
            proforma.tarifsByPort().load({params:{port_id:newVal}});
    }

    this.beforeSaveProforma=function(store, action, rec, options, ar){
        var tarifs= proforma.calcGrid().store.getModifiedRecords();
        var sz=[];
        proforma.calcGrid().store.data.each(function(itm){
            sz.push(itm.data);
        });
        options.params.tarifs= Ext.util.JSON.encode(sz);
        //rec.fields.add({name:'prof_tarif_calcs',type:'string'});
        //rec.data.prof_tarif_calcs=sz;
        //rec.set("prof_tarif_calcs",sz);
        //rec.data.tarifs=sz;
        //rec.json.tarifs=sz;
        //console.log(rec);
    }
}