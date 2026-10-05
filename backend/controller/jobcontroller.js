const Job= require("../models/job")

const createJob = async(req,res)=>{
    try{
        const job= await Job.create({
        title:req.body.title,
        company:req.body.company,
        location:req.body.location,
        salary:req.body.salary,
        jobtype:req.body.jobtype,
        description:req.body.description,
        skills:req.body.skills,
        recruiterId:req.user.userId

    })

    res.status(201).json({
        status:true,
        data:job
    })
    }
    catch(error){
        return res.status(400).json({
            status:false,
            message:"Something Went Wrong"
        })
    }
}

const getAllJobs = async (req,res)=>{
    const filter ={}
    if(req.query.location){
        filter.location=req.query.location
    } 
    if (req.query.jobtype){
        filter.jobtype=req.query.jobtype
    }
    if(req.query.title){
        filter.title= {$regex: req.query.title , $options:"i"};
    }

    const jobs = await Job.find(filter);


    return res.status(200).json({
        status:true,
        data:jobs
    })
}

const getOneJob= async(req,res)=>{
    const job = await Job.findById(req.params.id);
    if(!job){
        return res.status(404).json({
            status:false,
            message:"CURRENTLY NO VACANCY FOR THAT ROLE"
        })
    }

    return res.status(200).json({
        status:true,
        data:job
    })
}

const updateJob = async (req,res)=>{
    const job= await Job.findByIdAndUpdate(req.params.id,req.body,
        {
            new:true,
            runValidators:true
        }
    )
    if(!job){
        return res.status(404).json({
            status:false,
            message:"JOB NOT FOUND"
        })
    }

    return res.status(200).json({
        status:true,
        data:job
    })
}
const deleteJob= async(req,res)=>{
    const job = await Job.findByIdAndDelete(req.params.id);

    if(!job){
        return res.status(404).json({
            status:false,
            message:" JOB NOT FOUND " 
        });

    }

    return res.status(200).json({
        status:true,
        data:job
    })
}

module.exports = {createJob, getAllJobs,getOneJob,updateJob,deleteJob}