

var express=require('express');
var Router=express.Router();
var Comment=require("../models/comments.js");
var campground=require("../models/campground.js");


// Comments
// Comments Get page
Router.get("/campgrounds/:id/comment",isloggedin,function(req,res){
    campground.findById(req.params.id,function(err,campground)
{
    if(err)
    {
        console.log(err)
    }
    else
    {
     res.render("comment.ejs",{camper : campground})   
    }
})
})
// Comments logic
Router.post("/campgrounds/:id",isloggedin,function(req,res){

    campground.findById(req.params.id,function(err,campground)
    {
        var comments=req.body.comments
Comment.create({
                        author:req.user,
                        comments:comments
                        
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }
                            campground.comments.push(comment);
                            campground.save(function(err)
                               {

             if(err)
             {
                console.log("")
             }
                            console.log("comment added");
                            res.redirect("/campgrounds/"+campground._id)
                                    });
                            
                        
                    })
                  
        });  
        });
        function isloggedin(req,res,next){
            if(req.isAuthenticated()){
                return next();
            }
            res.redirect("/signin");
        }
        module.exports=Router;