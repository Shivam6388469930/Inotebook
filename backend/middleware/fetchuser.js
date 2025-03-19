const JWT=require('jsonwebtoken')
const jwt_secret="shivamcoder"
const fetchuser=(req,res,next)=>{
    // get the user from the jwt token and add id to req object
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({error:"please authenicate using valid token"})
    }
    try {
        const data=JWT.verify(token,jwt_secret)
        req.user=data.user;
        next();
        
    } catch (error) {
        res.status(401).send({error:"please authenicate using valid token catch"})
        
    }
    
}

module.exports=fetchuser