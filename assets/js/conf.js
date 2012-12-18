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
		"tab": true,
		"taburl": "Overview/Common.html",
		"tabcss": "Overview/Common.css",
		"tabscript": "Overview/Common.js",
		"children": regions,
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