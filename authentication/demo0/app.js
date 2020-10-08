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

//body parser
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');
// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
	secret:"oh yeah",
	resave:false,
	saveUninitialized:false
}));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ==============================
//           ROUTES
// ============================== 


app.get("/",function (req,res) {
	res.render("home");
});

app.get("/signup",function (req,res) {
	res.render("signup");
});

app.get("/secret",function (req,res) {
	res.render("secret");
})

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



// Port Running
app.listen(port,function(){
	console.log(`Example app listening at http://localhost:${port}`)
}); 