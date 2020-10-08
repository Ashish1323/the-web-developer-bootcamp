var express=require('express');
var Router=express.Router();

Router.get("/",function(req,res){
    res.render("home.ejs");
});

Router.get("/campground",function(req,res){
    var curuser=req.user;
    campground.find({},function(err,campground){
    if(err){
        console.log(err)
    }
    else{
        console.log("Hogya Kam");
        res.render("camping.ejs",{camper:campground,user:curuser})
    }

});
});

Router.post("/campground",function(req,res){
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

Router.get("/newcamp",function(req,res){
    
    res.render("new.ejs");
})
Router.get("/campgrounds/:id",function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err,found)
    {
        if(err)
        {
            console.log("gand mara")
        }
        else
        {
         res.render("abc.ejs",{camper : found})   
        }
    })
    })

    module.exports= Router;