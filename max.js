var size=prompt("enter size of array!")
var l=[];
for(var j=0;j<=size-1;j++){
	var m=prompt("enter elements");
	l.push(m);
}

function max(arr){
	var max=arr[0];
	for(var i=0;i<arr.length;i++){
		if(arr[i]>max){
			max=arr[i];
		}
	}
	alert(max);
}

max(l);