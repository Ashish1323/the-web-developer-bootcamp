var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo1");

var Post=require("./models/post");
var User=require("./models/user");

// User.create({name:"hornyboy", email:"chussomeralodaa@xxx.com"});


// Post.create({
// title:"Angad randi ka bacha madarchod",
// content:"fimeroprfkmepfgm2e bee"
// },function(err,post){
// 	if(err)
// 	{
// 		console.log("Ashish bhadwa");
// 	}
// 	else
// 		User.findOne({name:"hornyboy"},function(err,user){
// 			if(err)
// 			{
// 				console.log("angad ki mkc");
// 			}
// 			else
// 			{
// user.posts.push(post);
// user.save(function(err,data)
// {
// 	if(err)
// 	{
// 		console.log(err);
// 	}
// 	else
// 	{
// 		console.log(data);
// 	}
// })
// }
// 		})
// })

User.findOne({name:"hornyboy"}).populate("posts").exec(function(err,data){
	if(err){
		console.log(err);
	}
	else{
		console.log(data);
	}
})
