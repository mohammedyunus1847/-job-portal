const roleMiddleware = (role)=>{
    return (req,res,next)=>{
        // console.log("USER ROLE:", req.user.role);
        // console.log("REQUIRED ROLE:", role);
        if(req.user.role.toLowerCase()!==role.toLowerCase()){
            return res.status(403).json({
                status:false,
                message:"ACCESS DENIED"
            })
        }
        next();
    }
}

module.exports = roleMiddleware;