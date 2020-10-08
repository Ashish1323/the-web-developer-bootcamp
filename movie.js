var movie=[{name:"dil chata h",watched: 1, Rating: 5},
{name:"pati fauj mai patni mauj mai",watched: 0, Rating: 69}]

for (var i=0;i<movie.length;i++){
	if(movie[i].watched==1){
		alert("haan be dekhi hai "+ movie[i].Rating + " stars movie h")
	}
	else {
		alert("nahi dekhi madarchod " + movie[i].Rating + " stars movie h")
	}
}