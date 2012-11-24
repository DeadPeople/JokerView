Create new View in views/[catalog]/[item] , ex:
	views/Dashboard/Users.html

edit conf.js in "catalog", ex:
	{	"title": "Dashboard", 
		"children": [
			{"title": "Users"}
		]
	}

It will auto load target view.

Notice:
	When user click other view, it will call closeView() function, ex please see views/Dashboard/Devices.html