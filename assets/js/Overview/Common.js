function doScript() {
	displayTargetView();
}

// display the viewByType
function displayTargetView(type) {
	if(type == null) type = myPara[TYPE];
	$("#views div.viewContent").removeClass("active");
	$("#views div.viewContent[data-type='" + type + "']").addClass("active");
}