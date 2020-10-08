var size=prompt("enter size of array!")
var l=[];
for(var j=0;j<=size-1;j++){
	var m=prompt("enter elements");
	l.push(m);
}

function uniform(arr){
	var k=0;
		for (var i=0;i<=arr.length-1;i++){


			if(arr[i]===arr[i+1]){
				k=k+1;
			}
			
		}	
		if(k==arr.length-1){

			alert("true");
		}
		else{

		         alert("false")
				
			}
		
}
uniform(l);
