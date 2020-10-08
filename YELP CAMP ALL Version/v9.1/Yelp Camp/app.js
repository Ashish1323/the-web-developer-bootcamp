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
var CampgroundRoutes=require("./routes/campground.js");
var CommentRoutes=require("./routes/comment.js");
var indexRouter=require("./routes/index.js");





const port= 9000;

// SeedDB();

app.use(require("express-session")({
	secret:"oh yeah",
	resave:false,
	saveUninitialized:false
}));
// Passport Setup

app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})

passport.use(new LocalStatergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(CampgroundRoutes);
app.use(CommentRoutes);
app.use(indexRouter);
    


app.listen(port,function(){
    console.log("Roo mat");
})