let mongoose=require("mongoose")
let userSche=new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String,
    "otp":String,
    "role":{
        type:String,
        default:"user"
    }
})
let um=mongoose.model("userDb",userSche)
module.exports=um