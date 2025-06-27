let nodemailer=require("nodemailer")
let bcrypt=require("bcrypt")
const um = require("../Models/userModel")
const transport=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"satish.somala2002@gmail.com",
        pass:"ryuawynvptcrlamk"
    }

})
let sendOtp=async(req ,res)=>{
    try{
        let obj=await um.findById(req.params.uid) 
        if(obj){
            let otp=Math.floor(Math.random()*99999+10000);
            await um.findByIdAndUpdate({"_id":obj._id},{"otp":otp})
            const info=await transport.sendMail({
                from:'"postmanagement.com" <satish.somala2002@gmail.com>',
                to:`${obj._id}`,
                subject:"OTP Verification",
                text:`Your Otp for Verification for Post Management Website  is : ${otp}`
            })
            res.json({"msg":"otp sent"})
        }
        else{
            res.json({"msg":"Check Email"})
        }
    }
    catch(error){
        res.json({"msg":"Error in Sending Otp"})
        console.log(error);
        
    }
}
let updatePwd=async(req,res)=>{
    try{
        let obj=await um.findById(req.body.uid)
        if(obj.otp==req.body.otp){
            let hashpwd=await bcrypt.hash(req.body.pwd,10)
            await um.findByIdAndUpdate({"_id":obj._id},{"pwd":hashpwd,"otp":""})
            res.json({"msg":"Password Reset Done"})
        }
        else{
            res.json({"msg":"Enter Valid Otp.."})
        }
    }
    catch(error){
        res.json({"msg":"Error in Updating Pasdword"})
    }
}
module.exports={sendOtp,updatePwd}