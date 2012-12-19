function doScript() {
	// id of Cytoscape Web container div
	var div_id = "SankeyDiagram";

	var networ_json = {
		dataSchema: {
			nodes: [ { name: "label", type: "string" }, 
					 { name: "weight", type: "number" }
				],
			edges: [ { name: "label", type: "string" },
					 { name: "bar", type: "string" },
					 { name: "weight", type: "number" }
			]
		},
		data: {
			nodes: [ 
				{ id: "1", label: "Homepage" }, 
				{ id: "2", label: "Search"}, 
				{ id: "3", label: "Browse" },
				{ id: "4", label: "Registration" },
				{ id: "5", label: "View Item" },
				{ id: "6", label: "My XXXX" },
				{ id: "7", label: "Cart" },
				{ id: "8", label: "BBOAWA" },
				{ id: "9", label: "Checkout" },
				{ id: "10", label: "Payment" },
				{ id: "11", label: "BBE" }
			],
			edges: [ 
				{ id: "2to5", target: "5", source: "2", directed: true }, 
				{ id: "3to5", target: "5", source: "3", directed: true },
				{ id: "5to7", target: "7", source: "5", directed: true },
				{ id: "5to8", target: "8", source: "5", directed: true },
				{ id: "7to9", target: "9", source: "7", directed: true },
				{ id: "9to10", target: "10", source: "9", directed: true },
				{ id: "9to11", target: "11", source: "9", directed: true }
			]
		}
	}
	
	// visual style we will use
	var visual_style = {
		global: {
			backgroundColor: "#FFFFFF"
		},
		nodes: {
			shape: "ROUNDRECT",
			borderWidth: 3,
			borderColor: "#BBBBBB",
			size: { defaultValue: 80, 
			  continuousMapper: { attrName: "weight", 
								  minValue: 80, 
								  maxValue: 160 }
			},
			color: {
				discreteMapper: {
					attrName: "id",
					entries: [
						/*{ attrValue: 1, value: "#ED8787" },
						{ attrValue: 2, value: "#FFB340" },
						{ attrValue: 3, value: "#6375EF" },
						{ attrValue: 4, value: "#FFFF4F" },
						{ attrValue: 5, value: "#89C4F3" },
						{ attrValue: 6, value: "#88FF88" },
						{ attrValue: 7, value: "#FFB7B7" },
						{ attrValue: 8, value: "#88FF88" },
						{ attrValue: 9, value: "#88FF88" },
						{ attrValue: 10, value: "#6375EF" },
						{ attrValue: 11, value: "#ED8787" }*/
					]
				},
			},
			labelHorizontalAnchor: "center"
		},
		edges: {
			width: {
				defaultValue: 3,
				continuousMapper: { attrName: "weight", minValue: 1, maxValue: 10 }
			},
			color: "#0B94B1"
		}
	};
	
	// initialization options
	var options = {
		swfPath: "../assets/cytoscape_web/swf/CytoscapeWeb",
		flashInstallerPath: "../assets/cytoscape_web/swf/playerProductInstall"
	};
	
	var vis = new org.cytoscapeweb.Visualization(div_id, options);
	

	var draw_options = {
		// your data goes here
		network: networ_json,
		
		// show edge labels too
		edgeLabelsVisible: true,
		
		// let's try another layout
		layout: {
			name: "Preset" ,
			options: {
				points: [
					{ id: "1", x: -350, y: 150 },
					{ id: "4", x: -250, y: 150 },
					{ id: "6", x: -150, y: 150 },
					
					{ id: "2", x: 0, y: 100 },
					{ id: "3", x: 0, y: 200 },
					
					{ id: "5", x: 150, y: 150 },
					{ id: "7", x: 300, y: 100 },
					{ id: "8", x: 300, y: 200 },
					{ id: "9", x: 450, y: 100 },
					{ id: "10", x: 600, y: 100 },
					{ id: "11", x: 600, y: 200 }
				]
			},
		},
		
		// set the style at initialisation
		visualStyle: visual_style,
		
		// hide pan zoom
		panZoomControlVisible: true 
		
	};
	
	 vis.ready(function() {
		// add a listener for when nodes and edges are clicked
		vis.addListener("click", "nodes", function(event) {
			handle_click(event);
		});
		
		function handle_click(event) {
			 var target = event.target;
			
			$("#cu_Overview li:contains('"+target.data["label"]+"')").click();
		}
	});
	
	vis.draw(draw_options);
	
	// display the hightcharts
	var chart;
	
	object = {
		credits: {enabled: false},
		chart: {
			renderTo: 'myChart',
			type: 'line',
			marginRight: 130,
			marginBottom: 25
		},
		title: {
			text: 'Monthly Average Temperature'
		},
		subtitle: {
			text: 'Source: WorldClimate.com'
		},
		yAxis: {
			title: {
				text: 'Temperature (°„C)'
			}
		},
		tooltip: {
			formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
					this.x +': '+ this.y +'°„C';
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: -10,
			y: 100,
			borderWidth: 0
		}
	}
	
	bindJSON(object, "../mockup/users.txt", {rnd: (new Date()).getTime()}, function(data){
		chart = new Highcharts.Chart(data);
	});
	
	$("#myTable table").slideView(0);
}