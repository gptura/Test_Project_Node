var express = require("express"),
    app     = express(),
    bodyParser = require("body-parser");

//tells node to use body parser    
app.use(bodyParser.urlencoded({extended: true}));
    
    
//To explicitly tell node to serve this folder together with views    
app.use(express.static("public"));

//Tells node to set all pages in views as an ejs file
app.set("view engine", "ejs");

var students = [
        {id: "", name: "", code: "", subject: "", teacher: "", schedule: "", units: "", section: "", course: ""}
        
];

// Root route
app.get("/", function(req,res){
    res.render("home");
});

app.get("/students", function(req, res){
    
    res.render("students", {students:students});
});

//post page
app.post("/students", function(req, res){
    //get data from form and add to students registered
    var id  =req.body.id,
        name=req.body.name,
        code=req.body.code,
        subject=req.body.subject,
        teacher=req.body.teacher,
        schedule=req.body.schedule,
        units=req.body.units,
        section=req.body.section,
        course=req.body.course;
    
    var newStudent = {id: id, name: name, code: code, subject: subject, teacher: teacher, schedule: schedule, units: units, section: section, course: course}
    students.push(newStudent);
    
    //redirect back to students registered page
    res.redirect("/students");
    
});

//page that will show the form for new student registration
app.get("/students/register", function(req, res){
    res.render("register.ejs");
});

app.get("*", function(req,res){
    res.send("Error 404");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
});


