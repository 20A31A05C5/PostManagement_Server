let mongoose=require("mongoose")
let postSche=new mongoose.Schema({
    "_id":String,
    "title":String,
    "desc":String,
    "cat":String,
    "uid":String,
    "name":String,
    "date":{
        type:Date,
        default:Date.now
    },
    "status":{
        default:"pending",
        type:String
    },
    "comm":String,
    "comments":[
          {
            name: String,
            text: String,
            id:String,
            date: {
                type: Date,
                default: Date.now
            }
        }]
    ,
    "like":[],
    "dlike":[]
})
let pm=mongoose.model("postDb",postSche);
module.exports=pm