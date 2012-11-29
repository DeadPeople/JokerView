$.fn.extend({
	slideView: function(speed, callback) {
		var target = $(this);
		
		// bind slide target
		target.find("[slide-toggle]").each(function(){
			if($(this).data("slide") == "slide") return;
			$(this).data("slide", "slide");
			$(this).click(function(){
				var data = $(this).attr("slide-toggle");
				target.find("[slide-target=" + data + "]").slideToggle(speed, callback);
			});
		});
		target.find("[slide-target]").each(function(){
			if($(this).attr("slide-open") == undefined) 
				$(this).css("display", "none");
		});
	},
});