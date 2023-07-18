
const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const app= express();
const session= require("express-session")
const User= require("./models/user")

const dotenv = require('dotenv')
dotenv.config();

app.set("view engine", "ejs")

app.listen(8000,() => {
    console.log("Server started on port 8000");
})

var path= require("path");
const { Console } = require("console");
const { Router } = require("express");

app.use(express.static(path.join(__dirname,"public")))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
        key:process.env.KEY,
        secret:process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie:{
            expires:600000
        }
    })
)

app.use((req,res,next)=>{
    if(req.session.user && req.cookies.user_sid){
        return res.render("index.ejs")
    }
    next()
})

var sessionChecker =(req,res,next)=>{
    if(req.session.user && req.cookies.user_sid){
        res.render("index.ejs")
    }
    else{
        next()
    }
}

var currentUser;


app.get("/logout", sessionChecker, async(req,res)=>{
    console.log("logout post called");
    var data= "logout@movieflix.com"
    var password= "loggingout@1344";

    try{
        const user= await User.findOne({"email": data}).exec();
        if(user == null){
            req.session.destroy;
            res.redirect("/login")
            return;
        }
        user.comparePassword(password,(error, match)=>{
            if(!match){
                console.log("Incorrect password");
                res.redirect("/login");
                return;
            }
            else{
                console.log("Password correct")
                req.session.user = user;
                currentUser= user;
                console.log("login :");
                console.log(currentUser);
                res.render("index.ejs", {curr: currentUser});
                return;
            }
        });
    }
    catch(e){
        console.log(e)
    }
})

app.route("/logout", async(req, res)=>{
    
})

app.get("/",sessionChecker,(req,res) =>{
    res.redirect("/login")
})


app.get("/index", (req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        res.render("index.ejs", {curr: currentUser});
    }
    else{
        res.redirect("/login")
    }
})


app.route("/login").get(sessionChecker, (req,res)=>{
    res.render("login.ejs")
})


app.post("/login", async(req, res) =>{
    var data= req.body.entry;
    var password= req.body.passwordL;

    try{
        const user= await User.findOne({"email": data}).exec();
        if(user == null){
            res.redirect("/login");
            return;
        }
        user.comparePassword(password,(error, match)=>{
            if(!match){
                console.log("Incorrect password");
                res.redirect("/login");
                return;
            }
            else{
                console.log("Password correct")
                req.session.user = user;
                currentUser= user;
                console.log("login :");
                console.log(currentUser);
                res.render("index.ejs", {curr: currentUser});
                return;
            }
        });
    }
    catch(e){
        console.log(e)
    }
})



app.route("/signup").get(sessionChecker, (req,res)=>{
    res.render("signup.ejs")
})
app.post("/signup",(req,res) =>{
    var name= req.body.full_name;
    var username=req.body.user_name;
    var email= req.body.email;
    var password= req.body.password;

    var data= new User({
        name: name,
        username: username,
        email: email,
        password: password
    });
    
    data.save((err,docs)=>{
        if(err){
            res.redirect("/signup");
        }
        else{
            console.log(docs)
            res.redirect("/")
            return
        }
    })
})



