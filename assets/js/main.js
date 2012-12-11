var OVERVIEW = "Overview";
var REGION = "REGION";
var myPara = new Array();

var regions = [
	"Homepage",
	"Search",
	"Browse",
	"Registration",
	"View Item",
	"My XXXX",
	"Cart",
	"BBOAWA",
	"Checkout",
	"Payment",
	"BBE"
];

$(document).ready(function() {
	// hiden the nav at the first time
	$("#cu_Overview").hide();
	
	// fill the nav region
	var region_list = $("#ddl_region ul.dropdown-menu");
	region_list.empty();
	var $overview = $("<li><a>" + OVERVIEW + "</a></li>");
	region_list.append($overview);
	region_list.append('<li class="divider"></li>');
	
	for(var one in regions) {
		var $li = $("<li></li>");
		var $a = $("<a></a>");
		$a.html(regions[one]);
		$li.append($a);
		region_list.append($li);
	}
	
	region_list.find("li:not(.divider)").click(function(){
		myPara[REGION] = $(this).find("a").html();
		enableNav();
	});
	
	// global navbar init
	$("#ddl_company").dropDown();
	$("#ddl_country").dropDown();
	$("#ddl_region").dropDown();
});

function enableNav() {
	if(myPara[REGION] == OVERVIEW) myPara[REGION] = null;
	if(myPara[REGION] == null) {
		$("#cu_Overview").slideUp("fast");
		$("#ddl_region span.title").html(OVERVIEW);
		$("[data-default]").click();
	} else {
		$("#cu_Overview").slideDown("fast");
		$("#ddl_region span.title").html(myPara[REGION]);
	}
}