function doScript() {
	$("#tabPage a.btn").click(function(){
		type = $(this).attr("data-type");
		displayTargetView(type);
	});
	
	$("#views div.viewContent").addClass("active");
	
	showFunnel();
	showTimeSeries();
	segmentationSeries();
	
	// delay load view
	$("#views").addClass("active");
	setTimeout(function(){
		var type = $("#tabPage a.btn.active").attr("data-type");
		displayTargetView(type);
		
		$("#views").removeClass("active");
		$("#loadTips").remove();
	}, 1000 );
}

// display the viewByType
function displayTargetView(type) {
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

// funnel view function
function showTimeSeries() {
	addScriptFiles([
		{"name": "jquery.tablesorter", "path": "../assets/jquery/tablesorter/jquery.tablesorter.js"}
	], function(){
		var chart;
		
		object = {
			credits: {enabled: false},
			chart: {
					renderTo: 'ts_chart',
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
			chart = new Highcharts.Chart(data);
		});
	});
}

// funnel view function
function segmentationSeries() {
	var chart;
	
	chart = new Highcharts.Chart({
		credits: {enabled: false},
		chart: {
			renderTo: 's_chart',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: 'Browser market shares at a specific website, 2010'
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage}%</b>',
			percentageDecimals: 1
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					color: '#000000',
					connectorColor: '#000000',
					formatter: function() {
						return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
					}
				}
			}
		},
		exporting: {
			buttons: {
				printButton: {enabled: false},
				exportButton: {enabled: false}
			}
		},
		series: [{
			type: 'pie',
			name: 'Browser share',
			data: [
				['Firefox',   45.0],
				['IE',       26.8],
				{
					name: 'Chrome',
					y: 12.8,
					sliced: true,
					selected: true
				},
				['Safari',    8.5],
				['Opera',     6.2],
				['Others',   0.7]
			]
		}]
	});
}