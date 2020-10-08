$("ul").on("click","li",function () {
	//class used to change the color and have a line-through in th code.
	$(this).toggleClass("clas");
})

$("ul").on("click","span",function(e){
	//parent is used to select li as we have chosen span..
	$(this).parent().fadeOut(1000,function(){
		//remove is used inside so that .fadeOut can fully work..
		$(this).remove();
	})
	// to stop the click of rest of the body parts we have used stop propagation.
	e.stopPropagation();

});

$("input").keypress(function(event){
	if(event.which==13){
		//storing value before enter
		var text=$(this).val();
		//making input bar empty once value is stored
		$(this).val("");
		//printing the value to the box.
		$("ul").append("<li><span> X</span> " + text + "</li>");
	}
})