const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router=express.Router()

const {applyJob} = require ("../controller/applicationController");

router.post("/:jobId",authMiddleware,applyJob);

module.exports=router;