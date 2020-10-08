var express=require("express");
var app=express();
var BodyParser=require("body-parser");
var mongoose= require("mongoose");
var campground=require("./models/campground");
var Comment=require("./models/comments");
var passportLocalMongoose=require("passport-local-mongoose");
var passport=require("passport");
var bodyParser=require("body-parser");
var User=require("./models/user.js");
var LocalStatergy=require("passport-local");


mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true});
app.use(BodyParser.urlencoded({extended : true}));
app.set('view engine','ejs');


var SeedDB=require("./seed.js")





const port= 9000;

SeedDB();

app.use(require("express-session")({
	secret:"oh yeah",
	resave:false,
	saveUninitialized:false
}));
// Passport Setup

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStatergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==================================
// Routes
// ====================================

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
app.get("/campgrounds/:id/comment",isloggedin,function(req,res){
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
app.post("/campgrounds/:id",isloggedin,function(req,res){
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


            // Authentication
            app.get("/signup",function (req,res) {
                res.render("signup");
            });
            
            
            
            
            
            app.post("/signup",function (req,res) {
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
            app.get("/signin",function (req,res) {
                res.render("signin");
            });
            
            app.post("/signin",passport.authenticate("local",{
                successRedirect:"/campground",
                failureRedirect:"/signin"
            }),
             function (req,res){
            
             })
            app.get("/logout",function (req,res) {
                req.logout();
                res.redirect("/");
            });
            function isloggedin(req,res,next){
                if(req.isAuthenticated()){
                    return next();
                }
                res.redirect("/signin");
            }



    


app.listen(port,function(){
    console.log("Roo mat");
})