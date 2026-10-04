const express=require("express")
const authMiddleware=require("../middleware/authMiddleware");

const{createJob}=require("../controller/jobcontroller");

const router = express.Router();
router.route.post("/",authMiddleware,createJob);

module.exports=router;

