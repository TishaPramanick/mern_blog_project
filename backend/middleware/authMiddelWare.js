const jwt = require("jsonwebtoken");

const authMiddleware = async(req , res , next)=>{

    const cookies = req.headers.cookie;
    const token = cookies?.split("=")[1];

     if(!token)
    {
        return res.status(404).json({msg : "No token found"});
    }
    jwt.verify(String(token) , process.env.JWT_SECRET , (err , user)=>{
        if(err)
        {
            return res.status(404).json({msg : "Unauthorize User"});
        }
        console.log(user.id);
        req.id = user.id;
    });
    next();
}


module.exports = authMiddleware;