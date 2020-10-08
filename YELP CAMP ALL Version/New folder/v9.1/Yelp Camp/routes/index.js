
    var express=require('express');
    var Router=express.Router();
    var Comment=require("../models/comments.js");
    var campground=require("../models/campground.js");
    var User=require("../models/user.js");
    var passport=require("passport");
            
    
    
    // Authentication
    // signup Route 
    Router.get("/signup",function (req,res) {
                res.render("signup");
            });
            
            
            
            
            // signup logic
            Router.post("/signup",function (req,res) {
                req.body.username
                req.body.password
                User.register(new User({username:req.body.username}),req.body.password,function (err,user) {
                    if(err){
                        console.log(err);
                        return res.render("signup");
                    }
                    
                        passport.authenticate("local")(req,res,function (){
                            res.redirect("/campground");
                        })
                    
                })
            })

            // signin Route
            Router.get("/signin",function (req,res) {
                res.render("signin");
            });
            // signin logic
            Router.post("/signin",passport.authenticate("local",{
                successRedirect:"/campground",
                failureRedirect:"/signin"
            }),
             function (req,res){
            
             });
             // logout route and logic
             Router.get("/logout",function (req,res) {
                req.logout();
                res.redirect("/");
            });

            //middleware
            function isloggedin(req,res,next){
                if(req.isAuthenticated()){
                    return next();
                }
                res.redirect("/signin");
            }



            module.exports= Router;