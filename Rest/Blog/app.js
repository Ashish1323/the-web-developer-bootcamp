var express= require("express");
var app=express();
var mongoose=require("mongoose");
var BodyParser=require("body-parser");


const port= 5000;

app.set("view engine", "ejs");
// mongoose setup
mongoose.connect("mongodb://localhost/Blog",{useNewUrlParser: true});



app.use(BodyParser.urlencoded({extended : true}));

var blogSchema= new mongoose.Schema({
    name:String,
    image:String,
    body:String,
    created: {type:Date, default: Date.now}
});

var Blog= mongoose.model("Blog",blogSchema);


// routes
app.get("/blogs",function(req,res){
    Blog.find({},function(err, blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("blog",{blogs:blogs});
        }
    })
});

app.get("/blogs/new",function(req,res){
    res.render("new");
});

app.post("/blogs",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var body=req.body.bds;

    var obj={name:name,image:image,body:body}

    Blog.create(obj,function(err,blogs){
        if(err){
            res.render("/blogs/new");
        }
        else{
            res.redirect("/blogs");
        }
    })
});

app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,blogs){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("blogdata",{blogs:blogs});
        }
    });
});

app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("edit",{blogs:blogs});
        }
    })
});

app.post("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,blog){
        if(err){
            console.log(err);
        }
        else{
            var name=req.body.name;
            var image=req.body.image;
            var body=req.body.body;

        var obj={name:name,image:image,body:body}

    Blog.update(obj,function(err,blogs){
        if(err){
            res.render(err);
        }
        else{
            res.redirect("/blogs");
        }
        }
    )} ;
    }) }); 
    
    app.get("/blogs/:id/delete",function(req,res){
        Blog.findById(req.params.id,function(err,blogs){
            if(err){
                console.log(err);
            }
            else{
                res.render("delete",{blogs:blogs});
            }
        })
    });

// delete post req
    app.post("/blogsa/:id",function(req,res){
        Blog.findByIdAndRemove(req.params.id,function(err){
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/blogs")
            }
        }) }); 
    


app.listen(port,function(){
    console.log("Roo mat");
});




