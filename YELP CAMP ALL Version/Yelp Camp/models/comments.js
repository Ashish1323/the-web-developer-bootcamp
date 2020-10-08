var mongoose=require("mongoose");
var commentsSchema= new mongoose.Schema({
    author:{
        id:{type:mongoose.Schema.Types.ObjectId,
            ref:"User"},
        username:String
    },
    comments:String
});



module.exports=mongoose.model("Comment",commentsSchema);                     