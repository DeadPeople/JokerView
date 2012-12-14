var regions = [
	{"title": "Homepage", },
	{"title": "Search", },
	{"title": "Browse", },
	{"title": "Registration", },
	{"title": "View Item", },
	{"title": "My XXXX", },
	{"title": "Cart", },
	{"title": "BBOAWA", },
	{"title": "Checkout", },
	{"title": "Payment", },
	{"title": "BBE", },
];

var catalog = 
[
	{
		"title": "Overview",
		"open": true,
		"canSlide": false,
		"url": "Overview/Overview.html",
		"css": "Overview/Overview.css",
		"script": "Overview/Overview.js",
		"default": true,
		"children": regions,
		/*[
			{"title": "Funnel", },
			{"title": "Time Series", },
			{"title": "Segmentation", },
			{"title": "Cube", },
		]*/
	},
	{
		"title": "Dashboard", 
		"children": [
			{"title": "Users", },
			{"title": "Devices", "url": "Dashboard/Devices.html"},
			{"title": "Countries", "css": "Overview/Overview.css"}
		]
	},
];