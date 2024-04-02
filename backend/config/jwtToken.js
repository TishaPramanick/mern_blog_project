const jwt = require("jsonwebtoken");

const createToken = (userId)=>{
    const token =  jwt.sign({id : userId} , process.env.JWT_SECRET , {expiresIn : "1d"});
    return token;
}

module.exports = createToken;