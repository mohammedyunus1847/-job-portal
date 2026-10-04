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

module.export = createJob;