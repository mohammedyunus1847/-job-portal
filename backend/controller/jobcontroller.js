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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const jobs = await Job.find(filter).skip(skip).limit(limit);
    const totalJobs = await Job.countDocuments(filter);
    const totalPages = Math.ceil(totalJobs / limit);


    return res.status(200).json({
        status: true,
        data: jobs,
        pagination: {
            currentPage: page,
            totalPages,
            totalJobs,
            limit
        }
    });
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


const updateJob = async (req, res) => {
    try {
        const job = await Job.findOneAndUpdate(
            {
                _id: req.params.id,
                recruiterId: req.user.userId
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!job) {
            return res.status(404).json({
                status: false,
                message: "Job not found or you are not authorized to update it"
            });
        }

        return res.status(200).json({
            status: true,
            data: job
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
};


const deleteJob = async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({
            _id: req.params.id,
            recruiterId: req.user.userId
        });

        if (!job) {
            return res.status(404).json({
                status: false,
                message: "Job not found or you are not authorized to delete it"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Job deleted successfully",
            data: job
        });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
};


const getMyJob= async (req,res)=>{
    const job = await Job.find(
        {
            recruiterId:req.user.userId
        }
    );

    if(job.length===0){
        return res.status(404).json({
            status:false,
            message:"NO JOBS AVAILABLE"
        })
    }
    console.log(req.user);
    return res.status(200).json({
        status:true,
        data:job  
    })
}

module.exports = {createJob, getAllJobs,getOneJob,updateJob,deleteJob,getMyJob}