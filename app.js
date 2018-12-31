var express = require("express"),
    app= express(),
    bodyParser= require("body-parser"),
    mongoose= require("mongoose");
    


mongoose.connect("mongodb://localhost/quiz_app");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

var questionSchema = new mongoose.Schema({
    question: String, 
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    answer: String
}); 

var Question = mongoose.model("Query",questionSchema);

Question.create({
  question: "Which is not a vowel?",
  option1: "w",
  option2: "a",
  option3: "e",
  option4: "i"
});

Question.create({
    question: "Which is first alphabet of english language?",
    option1: "c",
    option2: "a",
    option3: "b",
    option4: "d"
  });

app.listen(8000, function(){
    console.log("Quiz app running");
});

app.get("/quiz", function(req,res){
    Question.find({},function(err,ques){
        if(err){
            console.log(err);
        }else{
            res.render("index",{ques: ques});
        }
    });
});

app.get("/",function(req,res){  
    res.render("contact");
});
