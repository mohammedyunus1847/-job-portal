const mongoose = require('mongoose');

const jobSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true
    },
    company:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        trim:true,
        required:[true,"Please Enter Your Location"]
    },
    salary:{
        type:String,
        required:[true,"Enter Your Salary Expectation"],
        trim:true
    },
    jobtype:{
        type:String,
        enum:["Internship","FullTime","PartTime"],
        default:"FullTime",
        required:true
    },
    description:{
        type:String,
        trim:true
    },
    skills:{
        type:[String],
        trim:true,
        required:[true,"Enter Your Skills"]
    },
    recruiterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

})

const Job= mongoose.model("Job",jobSchema);

module.exports=Job;