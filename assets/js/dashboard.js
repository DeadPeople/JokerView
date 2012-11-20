$(document).ready(function(){
	$(".blockList a[data-toggle]").each(function(){
		$(this).click(function(){
			var data = $(this).attr("data-toggle");
			$(".blockList ul[data-target=" + data + "]").slideToggle("fast");
		});
	});
	$(".blockList ul[data-target]").css("display", "none");
});