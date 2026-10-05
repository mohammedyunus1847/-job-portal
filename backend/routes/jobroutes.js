const express=require("express")
const authMiddleware=require("../middleware/authMiddleware");

const{createJob,getAllJobs,getOneJob,updateJob,deleteJob}=require("../controller/jobcontroller");

const router = express.Router();
router.post("/",authMiddleware,createJob);
router.get("/",getAllJobs);
router.get("/:id",getOneJob);
router.put("/:id",authMiddleware,updateJob);
router.delete("/:id",deleteJob);

module.exports=router;

