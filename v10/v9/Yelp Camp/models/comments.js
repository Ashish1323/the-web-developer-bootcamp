var mongoose=require("mongoose");
var commentsSchema= new mongoose.Schema({
    author:String,
    comments:String
});



module.exports=mongoose.model("Comment",commentsSchema);                     