var express=require("express");
var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
var passport=require("passport");
var bodyParser=require("body-parser");
var User=require("./models/user.js");
var LocalStatergy=require("passport-local");

mongoose.connect("mongodb://localhost:27017/demo",{ useNewUrlParser: true } );
var app=express();
const port=7000;
app.set('view engine','ejs');

//body parser
app.use(bodyParser.urlencoded({extended: true}));
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


// ==============================
//           ROUTES
// ============================== 


app.get("/",function (req,res) {
	res.render("home");
});
app.get("/secret",isloggedin,function (req,res) {
	res.render("secret");
})

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
				res.redirect("/secret");
			})
		
	})
})
app.get("/signin",function (req,res) {
	res.render("signin");
});

app.post("/signin",passport.authenticate("local",{
	successRedirect:"/secret",
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
// Port Running
app.listen(port,function(){
	console.log(`Example app listening at http://localhost:${port}`)
}); 