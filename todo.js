var list=[];
var c=prompt("enter the choice of work? new, list, quit?")
while(c!="quit"){
if (c== "new"){
	var li=prompt("enter todo");
	list.push(li);
	c=prompt("enter the choice of work? new, list, quit?")
}

else if(c== "list" ){
	alert(list);
	c=prompt("enter the choice of work? new, list, quit?")
}
else if(c== "remove"){
	var r= prompt("enter the index!")
	        list.splice(r,1);
			alert("it is removed!");
			c=prompt("enter the choice of work? new, list, quit?")
		}
	


else{
	alert("wrong choice")
	c=prompt("enter the choice of work? new, list, quit?")

}

}