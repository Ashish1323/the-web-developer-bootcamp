var express=require("express");
app=express();
const port=3000;


app.get("/lol/:bhos/:nun",function(req,res){
    var chit=req.params.bhos;
    var na=req.params.nun;
    res.render("loda.ejs",{cc:chit , name:na});
});

app.get("*",function(req,res){
    res.send("You Are A Star!");
});



app.listen(port,function(){
    console.log(`Example app listening at http://localhost:${port}`)
    console.log("beta tum madarchod ho!!");
}); 


