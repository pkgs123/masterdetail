jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("masterdetail.util.formatter");
sap.ui.controller("masterdetail.view.Master", {


	onInit: function() {
		debugger;
		var listid=this.getView().byId("listid");
		var model=this.getOwnerComponent().getModel();
		var json=new sap.ui.model.json.JSONModel("model/mock.json");
		this.getView().setModel(json);
	},
	
	
	
	getRouter : function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},
	onListItemPress : function(oEvent) {
		 debugger;
		 that=this;
		// var list =oEvent.oSource.getBindingContext().sPath;
		// var str = oEvent.oSource.getBindingContext().oModel.getProperty(list);
		
				this.getRouter().navTo("Detail", {
				
			 });
	},
	liveSearch : function(oEvent) {
        debugger;
        var list = this.getView().byId("listid");
        var sValue = this.getView().byId("searchField").mProperties.value;
        var itms=list.getSelectedItems();
        var getItems = list.getItems();
        for (var i = 0; i < getItems.length; i++) {
            var EblName=list.getItems()[i].mAggregations.attributes[1].mProperties.text;
            var ElpName=list.getItems()[i].mAggregations.attributes[0].mProperties.text;
                if (EblName.indexOf(sValue) > -1 ||  ElpName.indexOf(sValue) > -1) {
                     getItems[i].setVisible(true);
                } else {
                     getItems[i].setVisible(false);
                }
            }
        },
});