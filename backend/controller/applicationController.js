const Application = require("../models/Application");
const Job = require("../models/job")

const applyJob= async(req,res)=>{
    const job = await Job.findById(req.params.jobId);

    if(!job){
        return res.status(404).json({
            status:false,
            message:"JOB NOT FOUND"
        });

    }
    const existingApplication = await Application.findOne({
        user:req.user.userId,
        Job:req.params.jobId
    })

    if(existingApplication){
        return res.status(409).json({
            status:false,
            message:"YOU ALREADY CREATED APPLICATION FOR THIS JOB WAIT FOR HR REPLY"
        })
    }

    const application = await Application.create({
        user:req.user.userId,
        Job:req.params.jobId
    })

    return res.status(201).json({
        status:true,
        data:application
    })

}

const getApplication = async (req,res)=>{
    const applications = await Application.find({
        user : req.user.userId
    }).populate("Job")

    if(applications.length===0){
        return res.status(404).json({
            status:false,
            message:"NO SUCH APPICATION FOUND"
        })
    }

    return res.status(200).json({
        status:true,
        data:applications
    })
}


module.exports = {applyJob,getApplication}