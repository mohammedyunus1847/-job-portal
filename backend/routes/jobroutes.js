const express=require("express")
const authMiddleware=require("../middleware/authMiddleware");
const roleMiddleware =require("../middleware/roleMiddleware");


const{createJob,getAllJobs,getOneJob,updateJob,deleteJob,getMyJob}=require("../controller/jobcontroller");

const router = express.Router();
router.post("/",authMiddleware,roleMiddleware("recruiter"),createJob);
router.get("/",getAllJobs);
router.get("/myjobs",authMiddleware,roleMiddleware("recruiter"),getMyJob)
router.get("/:id",getOneJob);
router.put("/:id",authMiddleware,roleMiddleware("recruiter"),updateJob);
router.delete("/:id",authMiddleware,roleMiddleware("recruiter"),deleteJob);


module.exports=router;

