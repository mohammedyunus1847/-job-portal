const express=require('express');
const authMiddleware= require("../middleware/authMiddleware")

const {registerUser,loginUser}=require("../controller/authController")

const router=express.Router();

router.route('/').post(registerUser)
router.route("/login").post(loginUser);

module.exports=router;