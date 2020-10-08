var express=require("express");
var app=express();
const port=5000;

app.get("/",function(req,res){
    res.send("Welcome to the first server!!");
});

app.listen(port,function(){
    console.log("you are good to go!!");
});

