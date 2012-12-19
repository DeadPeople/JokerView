var REGION = "REGION";
//var TYPE = "TYPE";
var myPara = new Array();

$(document).ready(function() {
	// addClickEventForNav
	$("#ca_Overview").click(function(){
		myPara[REGION] = null;
	});
	
	$("#cu_Overview li").click(function(){
		myPara[REGION] = $(this).html();
	});
	
	/*myPara[TYPE] = $("#tabPage a.btn.active").attr("data-type");
	$("#tabPage a.btn").click(function(){
		myPara[TYPE] = $(this).attr("data-type");
		loadView();
	});*/
	
	
	// global navbar init
	$("#ddl_company").dropDown();
	$("#ddl_country").dropDown();
});

/*function loadView() {
	try {
		displayTargetView(myPara[TYPE]);
	} catch(e) {
	}
}*/