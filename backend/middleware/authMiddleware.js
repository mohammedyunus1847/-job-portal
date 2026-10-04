const jwt = require ('jsonwebtoken');

const authMiddleware= (req,res,next)=>{
    const token=req.headers.authorization;

    if(!token){
        return res.json(401).json({
            message:"No Token Is Found"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user=decoded
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            status:false,
            message:"Invalid Or Expired Token Detected"
        })
    }

    
}

module.exports=authMiddleware;