var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   =require ("mongoose");
    
mongoose.connect("mongodb://localhost/testapp");

//Schema
var studentSchema = new mongoose.Schema({
    id: String,
    name: String,
    code: String,
    subject: String,
    teacher: String,
    schedule: String,
    units: String,
    section: String,
    course: String
});

//Model
var Student = mongoose.model("Student", studentSchema);

// Student.create(
//     {
//         id: "7890123456",
//         name: "Gean",
//         code: "Math102",
//         subject: "Trigonometry",
//         teacher: "Allan",
//         schedule: "MWF",
//         units: "4",
//         section: "Eng1b",
//         course: "Engineering"
        
//     }, function(err, student){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Student registered");
//             console.log(student);
//         }
//     });

//tells node to use body parser    
app.use(bodyParser.urlencoded({extended: true}));
    
    
//To explicitly tell node to serve this folder together with views    
app.use(express.static("public"));


//Tells node to set all pages in views as an ejs file
app.set("view engine", "ejs");



// Root route
app.get("/", function(req,res){
    res.render("home");
});

app.get("/students", function(req, res){
    //Get all students from db
    Student.find({}, function(err, allStudents){
        if(err){
            console.log(err);
        } else {
            res.render("students", {students: allStudents});
        }
    });
    //res.render("students", {students:students});
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
    
    var newStudent = {id: id, name: name, code: code, subject: subject, 
                    teacher: teacher, schedule: schedule, units: units, 
                    section: section, course: course}
    
    //Create or add a new registered student and save to db
    Student.create(newStudent, function(err, newlyRegistered){
        if(err){
            console.log(err);
        }else {
            //redirect back to students registered page
            res.redirect("/students");
        }
    });
    
   
    
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


