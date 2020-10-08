var mongoose=require("mongoose");
var postschema=new mongoose.Schema({
	title:String,
	content:String
});
module.exports=mongoose.model("Post",postschema);