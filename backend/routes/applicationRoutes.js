const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router=express.Router()

const {applyJob,getApplication,getApplicants,updateApllicationStatus} = require ("../controller/applicationController");

router.post("/:jobId",authMiddleware,roleMiddleware("jobseeker"),applyJob);
router.get("/",authMiddleware,roleMiddleware("jobseeker"),getApplication);
router.get("/job/:jobId",authMiddleware,roleMiddleware("recruiter"),getApplicants);
router.patch("/:applicationId",authMiddleware,roleMiddleware("recruiter"),updateApllicationStatus)

module.exports=router; 