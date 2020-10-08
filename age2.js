var age=prompt("tell your age?")

if(age<0){
	alert("tum chutiya ho!")
}
else if(age==21){
	alert("Hurray, you a champion!")
}
else if((Math.sqrt(age)%1)==0){
	alert("age is perfect square!")
}
else if(age%2!=0){
	alert("hello odd age person!!")
}
else{
	alert("maa chuda")
}