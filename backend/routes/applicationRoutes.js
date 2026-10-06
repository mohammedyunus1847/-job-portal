const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router=express.Router()

const {applyJob,getApplication,getApplicants,updateApllicationStatus} = require ("../controller/applicationController");

router.post("/:jobId",authMiddleware,applyJob);
router.get("/",authMiddleware,getApplication);
router.get("/job/:jobId",authMiddleware,getApplicants);
router.patch("/:applicationId",authMiddleware,updateApllicationStatus)

module.exports=router; 