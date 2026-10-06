const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router=express.Router()

const {applyJob,getApplication} = require ("../controller/applicationController");

router.post("/:jobId",authMiddleware,applyJob);
router.get("/",authMiddleware,getApplication)

module.exports=router;