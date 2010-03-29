var <%=class_name%>= new <%=class_name.pluralize%>();
function <%=class_name.pluralize%>(){
    var <%=file_name%>GridControl= null;
    var <%=file_name%>EditControl=null;
    var <%=file_name%>StoreControl=null;
    var <%=file_name%>MainControl=null;


    this.del= function(){
        this.<%=file_name%>EditPanel().deleteGridData(this.<%=file_name%>Grid());
    };

    this.edit=function(){
        this.<%=file_name%>EditPanel().loadGridData(this.<%=file_name%>Grid());
        this.<%=file_name%>EditPanel().setEditable(true);
    };
    this.newRow=function(){
        this.<%=file_name%>EditPanel().addNew(this.<%=file_name%>Grid());
    };

    this.add = function() {
        this.<%=file_name%>EditPanel().saveGridSata(this.<%=file_name%>Grid());
    };
            
    this.reset = function() {
        <%=file_name%>EditPanel().loadGridData(this.<%=file_name%>Grid());
    };

    this.<%=file_name%>Panel = function(){
        if (<%=file_name%>MainControl != null && !<%=file_name%>MainControl.isDestroyed) {
            return  <%=file_name%>MainControl;
        }
        <%=file_name%>MainControl = new Ext.Panel({
            layout:"border",
            title:"<%=class_name%>",
            items:[this.<%=file_name%>Grid(),this.<%=file_name%>EditPanel() ]
        });
                
        this.<%=file_name%>Grid().getSelectionModel().on("rowselect", function(grid, rowIndex, e) {
            <%=class_name%>.<%=file_name%>EditPanel().loadGridData(grid);
        });
        this.<%=file_name%>Grid().getSelectionModel().on("rowdeselect", function(grid, rowIndex, e) {
            <%=class_name%>.<%=file_name%>EditPanel().loadGridData(grid);
        });

        return <%=file_name%>MainControl;
    };
            
    this.<%=file_name%>EditPanel=function(){
        if (<%=file_name%>EditControl != null && !<%=file_name%>EditControl.isDestroyed) {
            return  <%=file_name%>EditControl;
        }
        <%=file_name%>EditControl = new Ext.FormPanel({
            region:"center",
            url:'/<%=file_name.pluralize%>',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
 <%= attributes.inject([]) do |mappings, a|
     mapping =  "                { "
     mapping << "fieldLabel: '#{a.name}',"
     mapping << "name: '#{a.name}'"
     mapping << " }\n"
     mappings << mapping
   end.join(',')
-%>
            ],

            bbar: [

                {
                    text: 'New',
                    iconCls:"silk-add",
                    handler: function(btn, evnt) {
                        <%=class_name%>.newRow();
                    }
                },{
                    text: 'Edit',
                    iconCls:"silk-page-edit",
                    handler: function(btn, evnt) {
                        <%=class_name%>.edit();
                    }
                },
                {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        <%=class_name%>.add();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        <%=class_name%>.reset();
                    }
                },
                {
                    text: 'Delete',
                    iconCls:"silk-delete",
                    handler: function(btn, evnt) {
                        <%=class_name%>.del();
                    }
                },


            ]
        }
                )
                ;
        <%=file_name%>EditControl.data = {};
        <%=file_name%>EditControl.setEditable(false);
        return <%=file_name%>EditControl;    
    }

    this.<%=file_name%>Grid=function(){
         if (<%=file_name%>GridControl != null && !<%=file_name%>GridControl.isDestroyed)
            return <%=file_name%>GridControl;

        <%=file_name%>GridControl = new Ext.grid.GridPanel(
        {
            title:"<%=class_name.pluralize%>",
            region:"north",
            store:this.<%=file_name%>Store(),
            collapsible:true,
            split:true,
            columns:[
                {
                    id:"id",
                    header:"#",
                    dataIndex:"id",
                    sortable:true,
                    hidden:true
                }
<%= attributes.inject('') do |mappings, a|
     mapping =  "                ,{ "
     mapping << "dataIndex: '#{a.name}', "
     mapping << "header: '#{a.name}' "
     mapping << " }\n"
     mappings << mapping
   end
-%>
            ]
        });
        return <%=file_name%>GridControl;
    }
 
    this.<%=file_name%>Store= function(){
       if (<%=file_name%>StoreControl != null)
            return <%=file_name%>StoreControl;
        var proxy = new Ext.data.HttpProxy({
            url: '/<%=file_name.pluralize%>'
        });

        var reader = new Ext.data.JsonReader({
            totalProperty: 'total',
            successProperty: 'success',
            idProperty: 'id',
            root: 'data',
            messageProperty: 'message'

        }, [
            { name: 'id', mapping: 'id' }
 <%= attributes.inject('') do |mappings, a|
     mapping =  "                ,{ "
     mapping << "name: '#{a.name}' "
     mapping << case a.type
       when :date     then ", type: 'date', dateFormat: 'Y-m-d'"
       when :time then ", type: 'date', dateFormat: 'c'"
       when :integer then ", type: 'int'"
       else ", type: '%s'" %a.type
     end
     mapping << " }\n"
     mappings << mapping
   end
-%>
        ]);

        var writer = new Ext.data.JsonWriter();

        <%=file_name%>StoreControl = new Ext.data.Store({
            restful: true,
            id: "<%=file_name.pluralize%>_store",
            proxy: proxy,
            reader: reader,
            listeners: {
                write : function(store, action, result, response, rs) {
                    Ext.MessageBox.alert(response.success, response.message);
                }
            },
            writer: writer
        });
        <%=file_name%>StoreControl.load();
        return <%=file_name%>StoreControl; 
    }

}
