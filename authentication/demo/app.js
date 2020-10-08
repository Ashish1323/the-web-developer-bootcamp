var express=require("express");
var app=express();
const port=7000;

app.set('view engine','ejs');

app.get("/",function (req,res) {
	res.render("home");
})


app.get("/secret",function (req,res) {
	res.render("secret");
})

app.listen(port,function()
{
	console.log(`Example app listening at http://localhost:${port}`)
}); 