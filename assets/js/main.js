var REGION = "REGION";
var TYPE = "TYPE";
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
	
	myPara[TYPE] = $("#tabPage a.btn.active").attr("data-type");
	$("#tabPage a.btn").click(function(){
		myPara[TYPE] = $(this).attr("data-type");
		loadView();
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

function loadView() {
	try {
		displayTargetView(myPara[TYPE]);
	} catch(e) {
	}
}