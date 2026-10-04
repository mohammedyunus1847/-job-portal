const mongoose = require ('mongoose');

const applicationSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    Job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },
    status:{
        type:String,
        enum:["Applied","Rejected","ShortListed"],
        default:"Applied"
    }
})

const Application=mongoose.model("Application",applicationSchema);

module.exports=Application;