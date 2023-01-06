const mongoose= require('mongoose')
const bcrypt= require('bcrypt')

mongoose.set('strictQuery', true);
uri="mongodb+srv://aviral_1344:qwerty6789@konekt.xxeqmsg.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri)
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
