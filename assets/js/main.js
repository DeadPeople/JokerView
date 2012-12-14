var REGION = "REGION";
var myPara = new Array();

$(document).ready(function() {
	// init enableNav
	enableNav();
	
	// global navbar init
	$("#ddl_company").dropDown();
	$("#ddl_country").dropDown();
});

function enableNav() {
	if(myPara[REGION] == null) {
		$("#tabPage").hide();
	} else {
		$("#tabPage").show();
	}
}