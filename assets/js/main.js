var REGION = "REGION";
var myPara = new Array();

$(document).ready(function() {
	// addClickEventForNav
	$("#ca_Overview").click(function(){
		myPara[REGION] = null;
	});
	
	$("#cu_Overview li").click(function(){
		myPara[REGION] = $(this).html();
	});
	
	// global navbar init
	$("#ddl_company").dropDown();
	$("#ddl_country").dropDown();
});