Ext.namespace("Ext.ux");

Ext.ux.ProfTarifHelper = function(proforma) {
	var tarifsPerPort=null;
	
	this.getTarifs=function(){
		if(tarifsPerPort!=null){
			return tarifsPerPort;
		}
		var port = proforma.gridPanel().getSelectedColumnValue("port_id");
		if(port==null)
			port=-1;
		var calc= Calc.tarif_calculationStore().find("port_id",port);
		tarifsPerPort = new Ext.data.Store({
			reader: Tarif.tarifStore().reader,
		});
		Ext.each(Tarif.tarifStore().data.items,function(item,indx,data){
			this.add(item);
		},tarifsPerPort);
		return tarifsPerPort;
	}
	
	this.changeCombo=function(){
		var port = proforma.gridPanel().getSelectedColumnValue("port_id");
		if(port==null)
			port=-1;
		var calc_index= Calc.tarif_calculationStore().find("port_id",port);
		if(calc_index>-1){
			var calc= Calc.tarif_calculationStore().getAt(calc_index)
			proforma.calcGrid().tarif_combo.clearFilter();
			proforma.calcGrid().tarif_combo.filterBy(function(rec,id){
				var id= this.get("id");
				var t_calc_id=rec.get("tarif_calculation_id");
				if(t_calc_id==id){
					return true;
				}
				return false
			},calc);
			proforma.calcGrid().tarif_combo.onLoad();
		}
	}
	
    this.calcTotal = function() {
        var valTotal = 0;
        var proformaCurrency = proforma.editPanel().getFieldByName("currency_id").getValue();
        proformaCurrency = Currency.currencyStore().getById( proformaCurrency);
        proforma.calcGrid().store.each(function(row) {
            var tarif_id = row.get("tarif_id");
            if(tarif_id!=1){
				var tarif=Tarif.tarifStore().getById(tarif_id);
				var val = row.get("val");
				var curr = tarif.get("currency_id");
				curr = Currency.currencyStore().getById(curr);
				val= parseFloat(val)* curr.get("rate");
				valTotal += val / proformaCurrency.get("rate") ;
			}
        }, this);
        proforma.editPanel().getFieldByName("total_eur").setValue(valTotal.toFixed(2));
    }

    this.handleProformaRowChanged = function() {
        proforma.calcGrid().setReadOnly(true);
		this.handlePortChanged();
        this.fillProfTarifs();
		this.calcTotal();
		this.changeCombo();
		if(proforma.gridPanel().getSelectionModel().getSelected()!=null){
			proforma.editPanel().getBottomToolbar().items.get(5).show();
		}else{
			proforma.editPanel().getBottomToolbar().items.get(5).hide();
		}
    }

    this.fillProfTarifs = function() {
        var prof = new ProfTarifCalcs();
        proforma.calcGrid().store.removeAll(true);
        prof.fillCalcStore(proforma.gridPanel(), proforma.calcGrid().store);
    }

    this.generateTarifs = function() {
		this.changeCombo()
		var row=proforma.gridPanel().getSelectionModel().getSelected();
		proforma.editPanel().putValues(row);
        var data = row.data;
		delete data.total_eur;
		var dataJson=Ext.util.JSON.encode(data);
		delete dataJson.total_eur;
        Ext.Ajax.request({
            url: '/prof_tarif_calcs/gen_tarifs',
            success: this.loadGeneratedCalc,
            method:"POST",
            failure: proforma.fail,
            params: { data: dataJson}
        });
    }

	this.deleteTarif=function(){
		var sel = proforma.calcGrid().getSelectionModel().selection.record;
		if(!sel)
			return;
		proforma.calcGrid().store.remove(sel);
	}
	
	
    this.loadGeneratedCalc = function(resp, opts) {
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

            proforma.calcGrid().store.insert(0, newTarif);
        }
        //proforma.calcGrid().store.save();
        console.log("generated " + proforma.calcGrid().store.getCount());

    }

    this.handlePortChanged = function() {
        var el = proforma.editPanel().getFieldByName("port_id");
        var newVal = el.getValue();
        proforma.tarifsByPort().removeAll(true);
        if (newVal)
            proforma.tarifsByPort().load({params:{port_id:newVal}});
    }

    this.beforeSaveProforma = function(store, action, rec, options, ar) {
        var tarifs = proforma.calcGrid().store.getModifiedRecords();
        var sz = [];
        proforma.calcGrid().store.data.each(function(itm) {
            sz.push(itm.data);
        });
        options.params.tarifs = Ext.util.JSON.encode(sz);

    }
}