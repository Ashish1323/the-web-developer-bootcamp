var express = require("express");
var router = express.Router(); //a new instance of express router and adding routes to this router. 
var Campground = require("../models/campground");


//INDEX ROUTE - show all campgrounds
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err) {
            console.log(err);
        } else {
             res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user}); //data + name passing in
        }   
    });
});


//CREATE - add new campgrounds to database
router.post("/", isLoggedIn, function (req, res){
    // get data from form and add to campgrounds array
    var name= req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author:author};
   //create a new campground and save to db
   Campground.create(newCampground, function(err, newlyCreated){
      if (err) {
          console.log(err);
      } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
          res.redirect("/campgrounds"); //
      }
   });
});


//NEW - show form to create new campground 
router.get("/new", isLoggedIn, function(req, res){
   res.render("campgrounds/new");
});


//SHOW - shows more info about campground selected - to be declared after NEW to not overwrite
router.get("/:id", function(req, res){
    //find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err) {
           console.log(err);
       } else {
            //render show template with that campground
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});
router.get("/:id/edit",authorization,function(req,res){
   
        Campground.findById(req.params.id,function(err,campgrounds){

                    res.render("campgrounds/edit",{campgrounds:campgrounds});
    
        })
});

router.post("/:id",authorization,function(req,res){
    Campground.findById(req.params.id,function(err,blog){
        if(err){
            console.log(err);
        }
        else{
            var name=req.body.name;
            var image=req.body.image;
            var body=req.body.body;

        var obj={name:name,image:image,description:body}

    Campground.update(obj,function(err,blogs){
        if(err){
              console.log(err);
        }
        else{
            res.redirect("/");
        }
        }
    )} ;
    }) });
    
    router.get("/:id/delete",authorization,function(req,res){
        Campground.findById(req.params.id,function(err,blogs){
            if(err){
                console.log(err);
            }
            else{
                res.render("campgrounds/delete",{campgrounds:blogs});
            }
        })
    });

    router.delete("/:id",authorization,function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
             }
    });
});






//middleware to check about logged in or not
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function authorization(req, res, next) {
    if(req.isAuthenticated()){
        // checks if user is present
                Campground.findById(req.params.id,function(err,campgrounds){
                    if(err){
                        res.redirect("back");
                    }
                    else{
                        // check whether the user owns the campground
        
                        if(campgrounds.author.id.equals(req.user._id)){
                            next();
                        }
                        else{
                            res.redirect("back");
                        }
                       
                    }
                })
        
            }
            else{
                res.redirect("back");
            }
}

module.exports = router; //returning/exporting router at the end
