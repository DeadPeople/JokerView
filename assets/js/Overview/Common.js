function doScript() {
	var type = $("#tabPage a.btn.active").attr("data-type");
	displayTargetView(type);
	
	$("#tabPage a.btn").click(function(){
		type = $(this).attr("data-type");
		displayTargetView(type);
	});
	
	showFunnel();
}

// display the viewByType
function displayTargetView(type) {
	if(type == null) type = myPara[TYPE];
	$("#views div.viewContent").removeClass("active");
	$("#views div.viewContent[data-type='" + type + "']").addClass("active");
}

// funnel view function
function showFunnel() {
	var chart;
	
	object = {
		credits: {enabled: false},
		chart: {
				renderTo: 'container',
				type: 'line'
			},
			title: {
				text: ''
			},
			yAxis: {
				title: {
					text: ''
				}
			},
		exporting: {
			buttons: {
				printButton: {enabled: false},
				exportButton: {enabled: false}
			}
		}
	}
	
	bindJSON(object, "../mockup/users.txt", {rnd: (new Date()).getTime()}, function(data){
		data["chart"]["renderTo"] = "atc_chart";
		chart = new Highcharts.Chart(data);
		data["chart"]["renderTo"] = "ryc_chart";
		chart = new Highcharts.Chart(data);
		data["chart"]["renderTo"] = "cyc_chart";
		chart = new Highcharts.Chart(data);
		data["chart"]["renderTo"] = "cyp_chart";
		chart = new Highcharts.Chart(data);
	});
	
	$("#tables table").slideView(0);
}