jQuery.sap.declare("masterdetail.Component");
jQuery.sap.require("masterdetail.MyRouter");
sap.ui.core.UIComponent.extend("masterdetail.Component", {
  metadata : {
    name : "zmastermasterdetail",
    version : "1.0",
    dependencies : {
      libs : ["sap.m", "sap.ui.layout"],
      includes : ["util/formatter.js"],
      components : []
    },
    rootView : "masterdetail.view.App",
    "config" : {
      resourceBundle : "",
      serviceConfig : {
        name: "",
        serviceUrl : "../masterdetail/proxy/sap/opu/odata/sap/ZTEMPLATE_SRV/?saml2=disabled",
        //serviceUrl : "../masterdetail/proxy/sap/opu/odata/sap/Z_FIORI_PI_SRV/?saml2=disabled",
      }
    },

    routing : {
      config : {
        routerClass : masterdetail.MyRouter,
        viewType : "XML",
        viewPath : "masterdetail.view",
        targetAggregation : "detailPages",
        clearTarget : false
      },
      routes : [
        {
          pattern : "",
          name : "main",
          view : "Master",
          targetAggregation : "masterPages",
          targetControl : "idAppControl",
          subroutes : [
            {
              pattern : "Detail/{ebp}/{status}",
              name : "Detail",
              view : "Detail"
            },
          ]
        },
        {
        	name : "main1",
          view : "Master",
          targetAggregation : "masterPages",
          targetControl : "idAppControl",
          subroutes : [
            {
              pattern : "AddTable/{movement}",
              name : "AddTable",
              view : "AddTable"
            }

          ]
        }
      ]
    }
  },
  init : function() {

    sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
    var mConfig = this.getMetadata().getConfig();
    var oRootPath = jQuery.sap.getModulePath("masterdetail");
    /*var i18nModel = new sap.ui.model.resource.ResourceModel({
      bundleUrl : [oRootPath, mConfig.resourceBundle].join("/")
    });
    this.setModel(i18nModel, "i18n");*/
    var sServiceUrl = mConfig.serviceConfig.serviceUrl;
    var bIsMocked = jQuery.sap.getUriParameters().get("responderOn") === "true";
    if (bIsMocked) {
      this._startMockServer(sServiceUrl);
    }
    var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl,true);
    oModel.setDefaultCountMode((sap.ui.model.odata.CountMode.None));
    oModel.setRefreshAfterChange(false);
    /*oModel.bCountSupported=false;*/
    oModel.attachMetadataFailed(function(){
            this.getEventBus().publish("Component", "MetadataFailed");
    },this);
    this.setModel(oModel);

    // Set device model
    var deviceModel = new sap.ui.model.json.JSONModel({
            isTouch : sap.ui.Device.support.touch,
            isNoTouch : !sap.ui.Device.support.touch,
            isPhone : sap.ui.Device.system.phone,
            isNoPhone : !sap.ui.Device.system.phone,
            listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
            listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
        });
        deviceModel.setDefaultBindingMode("OneWay");
       // this.setModel(deviceModel, "device");
        
        this.getRouter().initialize();
  },

  _startMockServer : function (sServiceUrl) {
    jQuery.sap.require("sap.ui.core.util.MockServer");
    var oMockServer = new sap.ui.core.util.MockServer({
      rootUri: sServiceUrl
    });

    var iDelay = +(jQuery.sap.getUriParameters().get("responderDelay") || 0);
    sap.ui.core.util.MockServer.config({
      autoRespondAfter : iDelay
    });

    oMockServer.simulate("model/metadata.xml", "model/");
    oMockServer.start();


    sap.m.MessageToast.show("Running in demo mode with mock data.", {
      duration: 4000
    });
  },

  getEventBus : function () {
    return sap.ui.getCore().getEventBus();
  }
});