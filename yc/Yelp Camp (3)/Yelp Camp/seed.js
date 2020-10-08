var mongoose=require("mongoose");
var campground=require("./models/campground");
var campground=require("./models/comments");


var data=[{
        name:"Ashish",
        image:"https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/Campground.jpg",
        description:"HEHE LOVE"

            },{
                name:"Angad",
                image:"https://www.parksconservancy.org/sites/default/files/styles/basic/public/programs/PRSF_130326_APAZ_179_2x1.JPG?itok=YguufFlB",
                description:"HEHE LOVE My Life"
            },{
                name:"Parikshit",
                image:"https://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
                description:"bhenchod"
            }]


function SeedDb(){
    campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("DB Removed");
            data.forEach(function(seed){
                campground.create(seed,function(err,data){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("campground Added");

                        Comment.create({
                            title:"Chuss Mera Loda",
                            author:"Loda"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comment.push(comment);
                                campground.save();
                                console.log("comment added");
                            }
                        })
                    }
                })
            })
        }
    })

}


module.exports=SeedDb;
