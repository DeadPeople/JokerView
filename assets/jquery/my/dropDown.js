$.fn.extend({
	dropDown: function() {
		var my = $(this);
		var selector = $(this).find("[data-toggle='dropdown'] .title");
		var list = $(this).find(".dropdown-menu li a");
		
		list.click(function(){
			selector.html($(this).html());
			my.attr("value", $(this).html());
		});
	},
});