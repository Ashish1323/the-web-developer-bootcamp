var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");
var postschema=new mongoose.Schema({
	title:String,
	content:String
});

var Post=mongoose.model("Post",postschema);
var UserSchema =new mongoose.Schema({
	email:String,
	name:String,
	posts:[postschema]
});
var User=mongoose.model("User",UserSchema);


var userdata={title: "Chuss Mera Loda Madarchod",
					content: "Tu Madarchod Hai Bhosda"};
Newuser.posts.push(userdata);
Newuser.save(function(err,user){
	if(err)
	{
		console.log(err);
	}
	else
	{
		console.log(user);
	}
});