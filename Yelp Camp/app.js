var express=require("express");
var app=express();
var BodyParser=require("body-parser");
var mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser: true});
app.use(BodyParser.urlencoded({extended : true}));

var campgroundSchema= new mongoose.Schema({
    name: String,
    image: String
});



    var campground=mongoose.model("campground",campgroundSchema);

    



const port= 7000;
var camppeople=[
    {name: "Ashish", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbTxKKEznPC5r5pOIqFBvb3-dH7Uwr1vMKbbEfwYO_wnNaN0Jb&usqp=CAU"},
    {name:"Angad", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUTOFWXvTQyZn3pVXpxmAc4uCpjVDu5XQq5yWrb2YvX34h0uHV&usqp=CAU"},
    {name:"parikshit hiremath", image:"https://pbs.twimg.com/media/CQkSp6KUkAEabD3.jpg"}
              ]


app.get("/",function(req,res){
    res.render("home.ejs");
});


app.get("/campground",function(req,res){
    campground.find({},function(err,campground){
    if(err){
        console.log(err)
    }
    else{
        console.log("Hogya Kam");
        res.render("camping.ejs",{camper:campground})
    }

});
});

app.post("/campground",function(req,res){
    var name=req.body.names;
    var url= req.body.url;
    var obj={name : name , image :url};
    campground.create(obj,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campground");
        }
    })
  

});

app.get("/newcamp",function(req,res){
    
    res.render("new.ejs");
})


app.listen(port,function(){
    console.log("Roo mat");
});