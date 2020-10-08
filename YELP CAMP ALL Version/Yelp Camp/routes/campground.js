var express=require('express');
var Router=express.Router();
var Comment=require("../models/comments.js");
var campground=require("../models/campground.js");


// ==================================
// Routes
// ====================================
// home route
Router.get("/",function(req,res){
    res.render("home.ejs");
});

// display campground
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

// logic for creating new campground
Router.post("/campground",isloggedin,function(req,res){
    var name=req.body.names;
    var url= req.body.url;
    var desc=req.body.description;
    var author={id:req.user._id,
    username:req.user.username};
    var obj={name : name , image :url,description:desc,author:author};
    campground.create(obj,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campground");
        }
    })
  

})
// new campground form page
Router.get("/newcamp",isloggedin,function(req,res){
    
    res.render("new.ejs");
})

// sub page get page
Router.get("/campgrounds/:id",function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err,found)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
         res.render("abc.ejs",{camper : found})   
        }
    })
    })

    function isloggedin(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/signin");
    }
Router.get("/campgrounds/:id/edit",function(req,res){
    campground.findById(req.params.id,function(err,campgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("edit",{campgrounds:campgrounds});
        }
    })
});

Router.post("/campgrounds/:id",function(req,res){
    campground.findById(req.params.id,function(err,blog){
        if(err){
            console.log(err);
        }
        else{
            var name=req.body.name;
            var image=req.body.image;
            var body=req.body.body;

        var obj={name:name,image:image,description:body}

    campground.update(obj,function(err,blogs){
        if(err){
              console.log(err);
        }
        else{
            res.redirect("/campground");
        }
        }
    )} ;
    }) });
    
    Router.get("/campgrounds/:id/delete",function(req,res){
        campground.findById(req.params.id,function(err,blogs){
            if(err){
                console.log(err);
            }
            else{
                res.render("delete",{campgrounds:blogs});
            }
        })
    });

    Router.delete("/campgrounds/:id",function(req,res){
        campground.findByIdAndRemove(req.params.id,function(err,loda){
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/campground");
            }
        });
     }); 
    module.exports= Router;