var REGION = "REGION";
var myPara = new Array();

$(document).ready(function() {
	// hiden the nav at the first time
	$("#cu_Overview").hide();
	
	// global navbar init
	$("#ddl_company").dropDown();
	$("#ddl_country").dropDown();
});

function enableNav() {
	if(myPara[REGION] == null)
		$("#cu_Overview").slideUp("fast");
	else
		$("#cu_Overview").slideDown("fast");
}