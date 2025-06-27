let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const um = require("../Models/userModel")

let adduser=async(req,res)=>{
    try{
        let obj=await um.findById(req.body._id)
        if(obj){
            res.json({"msg":"Account Already Exists..."})
        }
        else{
            let pwdhash=await bcrypt.hash(req.body.pwd,10)
            let data=new um({...req.body,"pwd":pwdhash})
            await data.save()
            res.json({"msg":"Account Created Successfully..."})
        }
    }
    catch(error){
        res.json({"error":"Error in Adding User..."})
    }

}
let login=async(req,res)=>{
    try{
        let obj=await um.findById(req.body._id);
        if(obj){
            let f=await bcrypt.compare(req.body.pwd,obj.pwd)
            if(f){
                res.json({"token":jwt.sign({"_id":req.body._id},"1234"),"uid":req.body._id,"name":obj.name,"role":obj.role})

            }
            else{
                res.json({"msg":"Check Password..."})
            }
        }
        else{
            res.json({"msg":"Check Email..."})
        }
    }
    catch(error){
        res.json({"error":"Error in Login..."})
    }
}
let isLogin=async(req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization,"1234")
        next()
    }
    catch(error){
        res.json({"msg":"Please Login..."})
    }
}
let isAdmin=async(req,res)=>{
    try{
        let obj=await um.findById(req.headers.uid)
        if(obj){
            if(obj.role==="user"){
                next()
            }
            else{
                res.json({"msg":"Your are Not a User..."})
            }
        }
        else{
            res.json({"msg":"Please Login..."})
        }
    }
    catch(error){
        res.json({"error":"error in Authorization"})
    }
}
module.exports={adduser,login,isLogin,isAdmin}