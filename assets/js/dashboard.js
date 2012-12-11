var scriptLists = new Object();
var cssLists = new Object();
var cur_css = "";

// Silde Binder
$(document).ready(function(){
	// init catalog
	var sidebar = $("#sidebar .blockList");
	for(var one in catalog) {
		var item = catalog[one];
		
		var title = item["title"];
		var open = item["open"] == true;
		var canSlide = !(item["canSlide"] == false);
		var turl = item["url"];
		var tcss = item["css"];
		var tdefault = item["default"] == true;
		
		var $a = $("<a></a>");
		$a.attr("id", "ca_" + title);
		var $icon = $("<img/>");
		$icon.attr("src", "../assets/img/CatalogIcons/" + title + ".png");
		$a.append($icon);
		var $title = $("<span></span>");
		$title.html(title);
		$a.append($title);
		if(canSlide) $a.attr("slide-toggle", title);
		if(turl != null) $a.attr("data-path", turl);
		if(tcss != null) $a.attr("data-css", tcss);
		if(turl != null & tdefault != null)  $a.attr("data-default", true);
		sidebar.append($a);
		
		var $ul = $("<ul></ul>");
		$ul.attr("id", "cu_" + title);
		if(canSlide) $ul.attr("slide-target", title);
		if(canSlide) if(open) $ul.attr("slide-open", "");
		sidebar.append($ul);
		
		var children = item["children"];
		for(var two in children) {
			var item = children[two];
			
			var subtitle = item["title"];
			var url = item["url"];
			var css = item["css"];
			var $li = $("<li></li>");
			var $icon = $("<img/>");
			$icon.attr("src", "../assets/img/CatalogIcons/" + title + "/" + subtitle + ".png");
			$li.append($icon);
			var $subtitle = $("<span></span>");
			$subtitle.html(subtitle);
			$li.append($subtitle);
			if(url == undefined) {
				$li.attr("data-path", title + "/" + subtitle + ".html");
			} else {
				$li.attr("data-path", url);
			}
			if(css == undefined) {
				$li.attr("data-css", title + "/" + subtitle + ".css");
			} else {
				$li.attr("data-css", css);
			}
			$ul.append($li);
		}
	}
	$("img").error(function(){
		$(this).attr("src", "../assets/img/CatalogIcons/default.png");
		$(this).unbind();
	});
	bindView();
});

function bindView() {
	// bind click open view
	$("[data-path]").click(function(){
		// highlight selected target
		$("[data-path]").removeClass("bind_selectedItem");
		$(this).addClass("bind_selectedItem");
		
		// close current view
		rmCSSFile(cur_css);
		try {
			closeView();
		} catch(err) {}
		
		// display the target view
		$("#content").empty();
		
		cur_css = $(this).attr("data-css");
		addCSSFile($(this).attr("data-css"), "../assets/css/"+$(this).attr("data-css"));
		
		$.get($(this).attr("data-path"),{rnd: Math.random()}, function(data){
			$("#content").html(data);
			
			// move the operation bar into navgation bar
			$("#navInsert").empty();
			$("#operationBar").appendTo($("#navInsert"));
		});
	});
	
	// bind slide target
	$("[slide-toggle]").each(function(){
		if($(this).data("slide") == "slide") return;
		$(this).data("slide", "slide");
		$(this).click(function(){
			var data = $(this).attr("slide-toggle");
			$("[slide-target=" + data + "]").slideToggle("fast");
		});
	});
	$("[slide-target]").each(function(){
		if($(this).attr("slide-open") == undefined) 
			$(this).css("display", "none");
	});
	
	// open default
	$("[data-default]").click();
}

// bind json data to an object
function bindJSON(object, url, data, callback) {
	$.getJSON(url, data, function(mydata){
		if(object != null) {
			for(var one in mydata) {
				var value = mydata[one];
				object[one] = value;
			}
			if(callback != undefined) callback(object);
		} else {
			if(callback != undefined) callback(mydata);
		}
	});
}

// bind data to a table
function bindJSONtoTable(table, url, data, callback) {
	if(table.is('table')) {
		$.getJSON(url, data, function(mydata){
			var data_header = null;
			var data_series = null;
			
			var $thead = $("<thead></thead>");
			table.append($thead);
			var $tbody = $("<tbody></tbody>");
			table.append($tbody);
			
			for(var one in mydata) { // init for the table data
				var item = mydata[one];
				
				if(item["categories"] != null && item["categories"] != undefined) {
					data_header = item["categories"];
				}
				
				if(one == "series") {
					data_series = item;
				}
			} // end for
			
			var hasName = false;
			
			if(data_header != null) { // add title for the table
				var $tr = $("<tr></tr>");
				$thead.append($tr);
				$tr.append("<th></th>");
				
				for(var i = 0; i < data_header.length; i++) {
					var value = data_header[i];
					
					
					var $th = $("<th></th>");
					$th.html(value);
					$tr.append($th);
				}
			}
			if(data_series != null) { // add data into tbody
				for(var i = 0 ; i < data_series.length ; i++) {
					var divItem = data_series[i];
					var $tr = $("<tr></tr>");
					$tbody.append($tr);
					
					var $title = $("<td></td>");
					$tr.append($title);
					if(divItem["name"] != undefined) {
						$title.html(divItem["name"]);
						hasName = true;
					}
					
					for(var j = 0 ; j < divItem["data"].length ; j++) {
						var value = divItem["data"][j];
						
						var $td = $("<td></td>");
						$td.html(value);
						$tr.append($td);
					}
				}
			}
			
			if(!hasName) { // rm title cell if not exist
				$thead.find("tr").find("th:first").remove();
				$tbody.find("tr").find("td:first").remove();
			}
			
			if(callback != undefined) callback(table);
		});
	}
}

// add script files in the document(scriptFiles is array {name: name, path: path})
function addScriptFiles(scriptFiles, callback) {
	var inProcess = scriptFiles.length;
	
	for (var i = 0; i < scriptFiles.length ; i++) {
		var script = scriptFiles[i];
		
		addScriptFile(script["name"], script["path"], function(){
			inProcess--;
			
			if(inProcess == 0) {
				callback();
			}
		});
	}
}

// add a script file in the document(only can add once)
function addScriptFile(name, path, callback) {
	if(scriptLists[name] == null || scriptLists[name] == undefined) {
		scriptLists[name] = path;
		$.getScript(path, callback);
	} else {
		if(callback != undefined) callback();
	}
}

// add a CSS file in the document(only can add once)
function addCSSFile(name, path) {
	if(cssLists[name] == null || cssLists[name] == undefined) {
		cssLists[name] = path + "?rnd=" + Math.random();
		
		if($.browser.msie && jQuery.browser.version <= 8){
			document.createStyleSheet(cssLists[name]);
		} else {
			var css = '<link rel="stylesheet" href="' + cssLists[name] + '" />';
			$("head").append(css);
		}
	}
}

// rm CSS file in the document
function rmCSSFile(name) {
	var cssPath = cssLists[name];
	if(cssPath != undefined) {
		$("link").each(function(){
			if($(this).attr("href") == cssPath) $(this).remove();
		});
		cssLists[name] = undefined;
	}
}