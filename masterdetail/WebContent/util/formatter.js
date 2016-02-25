jQuery.sap.declare("Crud_Operations.util.formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");

Crud_Operations.util.formatter = {

		DateFormat : function(value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getInstance({
                pattern : "dd MMM yyyy"
              });
			return oDateFormat.format(value);
	},
	ind:function(value1)
	{
		if(value1=="R"||value1=="r")
			{
			return "Reject";
			}
		else if(value1=="A"||value1=="a")
			{
			 return "Approved";
			}
		else
			{
				return value1;
			}
	},
	
	ind1:function(value1)
	{
	
		if(value1=="R"||value1=="r")
		{
		return "Reject";
		}
		else if(value1=="A"||value1=="a")
		{
		 return "Approved";
		}	
		else
			{
				return "None";			
			}
	},
 };
      
