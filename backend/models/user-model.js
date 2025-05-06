const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:String,
    email:String,  
    role:{
        type:String,
        enum:["user","Admin"]
     },
    password:String

})
module.exports=mongoose.model("user",userSchema);