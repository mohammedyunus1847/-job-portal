const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({
    Name : {
        type:String,
        required:[true,"Name Is Required"],
        trim: true,
        minlength:[2,"minimum two Characters is required"]
    },
    Email : {
        type:String,
        required:[true,"Email is Required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    Password : {
        type:String,
        required:[true,"Password is Required"],
        minlength:[6,"Password Must Be At Least 6 Characters"]
    },
    Role : {
        type:String,
        required:[true,"You Must Choose Your Role"],
        enum:["jobseeker","Recruiter"]
    }

}) 

const User=mongoose.model("User",UserSchema);

module.exports=User;