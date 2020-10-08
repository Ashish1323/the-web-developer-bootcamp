var express=require("express");
var app=express();
var BodyParser=require("body-parser");
var mongoose= require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true});

app.use(BodyParser.urlencoded({extended : true}));

var campground=require("./models/campground");
var SeedDB=require("./seed.js")




const port= 9000;

SeedDB();

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
    var desc=req.body.description;
    var obj={name : name , image :url,description:desc};
    campground.create(obj,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campground");
        }
    })
  

})

app.get("/newcamp",function(req,res){
    
    res.render("new.ejs");
})
app.get("/campgrounds/:id",function(req,res){
    campground.findById(req.params.id,function(err,campground)
    {
        if(err)
        {
            console.log("gand mara")
        }
        else
        {
         res.render("abc.ejs",{camper : campground})   
        }
    })
    })

    


app.listen(port,function(){
    console.log("Roo mat");
})