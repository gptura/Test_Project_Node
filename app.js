var express = require("express"),
    app     = express();
    
//To explicitly tell node to serve this folder together with views    
app.use(express.static("public"));

//Tells node to set all pages in views as an ejs file
app.set("view engine", "ejs");

// Root route
app.get("/", function(req,res){
    res.render("home");
});

app.get("*", function(req,res){
    res.send("Error 404");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});


