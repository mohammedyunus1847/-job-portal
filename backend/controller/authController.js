const User= require("../models/user");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser= async(req,res)=>{
    const existingUser= await User.findOne({
        
        Email:req.body.Email
        
    });
    if(existingUser){
        return res.json({
            status:false,
            message:"Your Account Has Been Already Registered With Us"
        })
    }
    const hashedPassword=await bcrypt.hash(req.body.Password,10);
    const user = await User.create({
        Name:req.body.Name,
        Email:req.body.Email,
        Password:hashedPassword,
        Role:req.body.Role
    })
   
    res.status(201).json({
        status:true,
        data:user,
        
    })
}

const loginUser = async(req,res)=>{
    const user = await User.findOne({
        Email:req.body.Email
    });

    if(!user){
        return res.status(404).json({
            status:false,
            message:"User Not Found"
        })
    }

    const isPasswordcorrect= await bcrypt.compare(
        req.body.Password,
        user.Password
    );

    if(!isPasswordcorrect){
        return res.status(400).json({
            status:false,
            message:"invalid credentials"
        })
    }
     const token= jwt.sign(
        {
            userId:user._id,
            role:user.Role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        }
        
    )
    
    return res.status(200).json({
            status:true,
            message:"Login Successfull",
            token:token
    })

}



module.exports={registerUser,loginUser};
