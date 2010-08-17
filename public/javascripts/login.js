function App(){
	loginEditControl=null;	
	this.editPanel = function() {
        if (loginEditControl != null && !loginEditControl.isDestroyed) {
            return  loginEditControl;
        }
        loginEditControl = new Ext.FormPanel({
            x:0,
			y:0,
            url:'/login/',
            frame:true,
            border:false,
            bodyBorder :false,
            defaults:{bodyBorder :false,frame:true,border:false,xtype:'textfield'},
            layout:"form",
            items: [
                { fieldLabel: 'login',name: 'login' }
                ,
                { fieldLabel: 'password', inputType:'password',name: 'pwd' },
				{xtype:'displayfield',value:"1",id:"msg_fld"}
            ]
        }
                );
		loginEditControl.getForm().on(
			{
				actioncomplete:function(form,action){
					window.location=action.result.url;
				},
				actionfailed:function(form,action){
					var msg_fld=Ext.getCmp("msg_fld");
					msg_fld.setValue(action.result.message);
					
				}
			});
        return loginEditControl;
    }
	
	
	this.start=function(){
		mainPanel = new Ext.Viewport(
        {
            id:'main-panel',
            layout:'absolute',
            renderTo:"main",
            items:[
             {
				xtype:"container"
			 }   
            ]
        });
		var window = new Ext.Window({
        title: 'Login',
        width: 300,
        height:200,
        layout: 'fit',
        plain:true,
        bodyStyle:'padding:5px;',
        buttonAlign:'center',
		closable:false,
        items: this.editPanel(),
        buttons: [ {
                    text: 'Save',
                    iconCls:"icon-save",
                    handler: function(btn, evnt) {
                        App.editPanel().getForm().submit();
                    }
                },
                {
                    text: 'Cancel',
                    iconCls:"silk-cancel",
                    handler: function(btn, evnt) {
                        //btn.getFormPanel().controller.reset();
                    }
                }]
    });

    window.show();
	}
}