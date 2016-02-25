jQuery.sap.declare("masterdetail.util.formatter");
jQuery.sap.require("sap.m.MessageBox");
sap.ui.controller("masterdetail.view.Detail", {

	onInit:function() {
     	debugger;
     	that=this;
 		this.oInitialLoadFinishedDeferred = jQuery.Deferred();
 		this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);
 	},
 	getRouter : function() {
 		return sap.ui.core.UIComponent.getRouterFor(this);
 	},
 	onRouteMatched : function(oEvent) {
    	debugger;
        var oParameters = oEvent.mParameters;
        if (oParameters.name === "Detail") {
        	
        	
         }
        
        },
});