const mongoose= require('mongoose')
const bcrypt= require('bcrypt')

const dotenv = require('dotenv')
dotenv.config()

mongoose.set('strictQuery', true);
const uri= process.env.SERVER;
mongoose.connect(uri);
var dbs = mongoose.connection
dbs.on('error',()=>console.log("error in connecting to database"));
dbs.once('open',()=>console.log("Connection to MongoDB database successful :)"))

const userSchema= mongoose.Schema({
    username:{
        type:String,
        unique: true,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    fav:{
        type:[String],
        required: false
    }
})

userSchema.pre("save",function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password= bcrypt.hashSync(this.password,10)
    next()
})

//compare Password
userSchema.methods.comparePassword= function(plain, callback){
    return callback(null, bcrypt.compareSync(plain, this.password))
}

const userModel= mongoose.model("user", userSchema)

module.exports = userModel
