
const express = require("express");
var bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app= express();


const uri="mongodb+srv://aviral_1344:beanjam2023@beanjam.dcogep7.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri);
var dbs = mongoose.connection
dbs.on('error',()=>console.log("error in connecting to database"));
dbs.once('open',()=>console.log("Connection to MongoDB database successful :)"))

app.listen(8000,() => {
    console.log("Server started on port 8000");
})

var path= require("path");

app.set("view-engine", "ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/",(req,res) =>{
    res.render("home.ejs")
})

app.get("/login",(req, res) =>{
    res.render("login.ejs", {msg: null})
})

app.get("/index",(req, res) =>{
    res.render("index.ejs")
})

app.post("/login",async (req, res) =>{
    var data= req.body.entry;
    var password= req.body.passwordL;

    try{
        const user1= await dbs.collection("users").findOne({"email": data});
        const user2= await dbs.collection("users").findOne({"username": data});
        console.log(user1);
        console.log(user2);
        if(user1.password == password || user2.password == password){
            res.redirect("/index")
        }
    }
    catch{
        res.render("login.ejs")
    }
})

app.get("/signup",(req, res) =>{
    res.render("signup.ejs")
})

app.get('/display-message', (req, res) => {
    res.send(req.flash('message'));
});

app.post("/signup",(req,res) =>{
    var name= req.body.full_name;
    var username=req.body.user_name;
    var email= req.body.email;
    var password= req.body.password;

    var data= {
        "name": name,
        "username": username,
        "email": email,
        "password": password
    };
    
    
    dbs.collection("users").insertOne(data,(err,collection) =>{
        if(err){
            throw err;
        }
        console.log("User inserted successfully")
    });

    return res.redirect("/login")

})

