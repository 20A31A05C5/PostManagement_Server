let {v4} =require("uuid")
const pm = require("../Models/postModel")
let addpost=async(req ,res)=>{
    try{
        let data=new pm({...req.body,"_id":v4()})
        await data.save()
        res.json({"msg":"Post Added Successfully"})
    }
    catch(error){
        res.json({"error":"Error in Addding Post..."})
    }
}
let getall=async(req ,res)=>{
    try{
        let data=await pm.find({"status":"approve"})
        res.json(data)
    }
    catch(error){
        res.json({"error":"Error in Fetching Posts.."})
    }
}
let getcat=async(req,res)=>{
    try{
        let data=await pm.find({"cat":req.params.cat,"status":"approve"})
        res.json(data)
    }
    catch(error){
        res.json({"error":"Error in Fetching Posts"})
    }
}
let getpost=async(req,res)=>{
    try{
        let data=await pm.findById(req.params.pid)
        res.json(data)
        console.log(data)
    }
    catch(error){
        res.json({"error":"Error in Fetching Post"})
    }
}
let upd=async(req,res)=>{
    try{
        await pm.findByIdAndUpdate({"_id":req.body._id},{...req.body,"status":"pending"})
        res.json({"msg":"Post Updated"})
    }
    catch(error){
        res.json({"error":"Error in Updating Post.."})
    }
}
let del=async(req,res)=>{
    try{
        await pm.findByIdAndDelete(req.params.pid)
        res.json({"msg":"Post Deleted..."})
    }
    catch(error){
        res.json({"error":"Error in Deleting Post.."})
    }
}
let pdm=async(req,res)=>{
    try{
        let data=await pm.find({"uid":req.params.uid})
        res.json(data)
    }
    catch(error){
        res.json({"error":"Error in Fetching Posts..."})
    }
}
let admin=async(req,res)=>{
    try{
        let data=await pm.find({}).sort({"status":-1})
        res.json(data)
    }
    catch(error){
        res.json({"error":"error in fetching posts.."})
    }
}
let inspect=async(req,res)=>{
    try{
        await pm.findByIdAndUpdate({"_id":req.body._id},{"comm":req.body.comm,"status":"inspect"})
        res.json({"msg":"Status Updated to Inspect.."})
    }
    catch(error){
        res.json({"error":"Error in Status Updatation(I)..."})
    }
}
let accept=async(req,res)=>{
    try{
        await pm.findByIdAndUpdate({"_id":req.params.pid},{"status":"approve",$unset:{"comm":null}})
        res.json({"msg":"Status Updated to Accept"})
    }
     catch(error){
        res.json({"error":"Error in Status Updatation(A)..."})
    }
}
let like=async(req,res)=>{
    try{
        await pm.findOneAndUpdate({"_id":req.body.pid,"like":{$ne:req.body.uid}},{$addToSet:{"like":req.body.uid},$pull:{"dlike":req.body.uid}})
        res.json({"msg":"done"})

        
    }
    catch(error){
        res.json({"msg":"Error in Like"})
    }
}
let dlike=async(req,res)=>{
    try{
        await pm.findOneAndUpdate({"_id":req.body.pid,"dlike":{$ne:req.body.uid}},{$addToSet:{"dlike":req.body.uid},$pull:{"like":req.body.uid}})
        res.json({"msg":"done"})

    }
    catch(error){
        res.json({"msg":"Error in Dlike"})
    }
}
let addcomm=async(req,res)=>{
    try{
        await pm.findByIdAndUpdate({"_id":req.body.pid},  {
        $push: {
          comments: {
            name: req.body.name,
            text: req.body.txt,
            id:req.body.uid
          }
        }
      })
        res.json({"msg":"Comment Added"})
    }
    catch(error){
        res.json({"msg":"Error in Adding Comment "})
    }
}
let delcom=async(req,res)=>{
    try{
        await pm.findByIdAndUpdate({"_id":req.body.pid},{ $pull: { comments: { _id: req.body.cid } } })
        res.json({"msg":"Comment Deleted"})
    }
    catch(error){
        res.json({"msg":"Error in Deleting Comment "})
    }
}
module.exports={addpost,getall,getcat,getpost,upd,del,pdm,admin,inspect,accept,like,dlike,addcomm,delcom}