// Silde Binder
$(document).ready(function(){
	// init catalog
	var sidebar = $("#sidebar .blockList");
	for(var one in catalog) {
		var item = catalog[one];
		
		var title = item["title"];
		var $a = $("<a></a>");
		$a.html(title);
		$a.attr("slide-toggle", title);
		sidebar.append($a);
		
		var $ul = $("<ul></ul>");
		$ul.attr("slide-target", title);
		sidebar.append($ul);
		
		var children = item["children"];
		for(var two in children) {
			var item = children[two];
			
			var subtitle = item["title"];
			var url = item["url"];
			var $li = $("<li></li>");
			$li.html(subtitle);
			if(url == undefined) {
				$li.data("path", title + "/" + subtitle + ".html");
			} else {
				$li.data("path", url);
			}
			$ul.append($li);
			
			$li.click(function(){
				$("#content").empty();
				$.get($(this).data("path"),{rnd: Math.random()}, function(data){
					$("#content").html(data);
				});
			});
		}
	}
	bindView();
});

function bindView() {
	$("[slide-toggle]").each(function(){
		if($(this).data("slide") == "slide") return;
		$(this).data("slide", "slide");
		$(this).click(function(){
			var data = $(this).attr("slide-toggle");
			$("[slide-target=" + data + "]").slideToggle("fast");
		});
	});
	$("[slide-target]").css("display", "none");
}

function bindJSON(object, url, data, callback) {
	$.getJSON(url, data, function(mydata){
		if(object != null) {
			for(var one in mydata) {
				var value = mydata[one];
				object[one] = value;
			}
			callback(object);
		} else {
			callback(mydata);
		}
	});
}