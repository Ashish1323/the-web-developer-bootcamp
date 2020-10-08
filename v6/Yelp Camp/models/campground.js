var mongoose=require("mongoose");
var campgroundSchema= new mongoose.Schema({
    name: String,
    image: String,
    description:String,
    comments:[]
});



module.exports=mongoose.model("campground",campgroundSchema);