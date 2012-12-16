var REGION = "REGION";
var myPara = new Array();

$(document).ready(function() {
	// init enableNav
	enableNav();
	
	// addClickEventForNav
	$("#ca_Overview").click(function(){
		myPara[REGION] = null;
		enableNav();
	});
	
	$("#cu_Overview li").click(function(){
		myPara[REGION] = $(this).html();
		enableNav();
	});
	
	
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