var express=require("express");
var app=express();
var BodyParser=require("body-parser");
var mongoose= require("mongoose");
var campground=require("./models/campground");
var Comment=require("./models/comments");


mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true});
app.use(BodyParser.urlencoded({extended : true}));


var SeedDB=require("./seed.js")

var CampgroundRoutes=require("./routes/campground.js");
var CommentRoutes=require("./routes/comment.js");
var index=require("./routes/index.js");

const port= 9000;

SeedDB();


app.get("/campgrounds/:id/comment",function(req,res){
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
app.post("/campgrounds/:id",function(req,res){
    campground.findById(req.params.id,function(err,campground)
        {
            var author=req.body.author
            var comments=req.body.comments
 Comment.create({
                            author:author,
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



    


app.listen(port,function(){
    console.log("Roo mat");
})