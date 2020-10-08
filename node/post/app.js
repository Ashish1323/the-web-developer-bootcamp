var express=require("express");
var app=express();
var BodyParser=require("body-parser");
app.use(BodyParser.urlencoded({extended:true}));
const port=4000;

var f=["angad","langad","pangad"];


app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home.ejs");
});
app.post("/addfriends",function(req,res)
{
    var n=req.body.nenu;
    f.push(n);
    res.redirect("/friends");
});

app.get("/friends",function(req,res){
    res.render("fri.ejs",{friends : f });
});



app.listen(port,function(){
    console.log(`Example app listening at http://localhost:${port}`);
});