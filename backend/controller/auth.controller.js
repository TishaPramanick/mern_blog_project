const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const { error } = require("../utils/errorHandler");
const signup = async(req , res , next)=>{
    const {name , email , password} = req.body;
    if(!name || !email || !password || name === "" || email === "" || password === "")
    {
        return next(error(400 , "All fields are required"));
    }

    const hashedPassword = bcrypt.hashSync(password , 10);
    const newUser = new User({
        name,
        email, 
        password : hashedPassword
    });

    try {
        await newUser.save();
        res.json("Sign Up successfully done");
    } catch (error) {
        next(error);
    }

}

module.exports = {signup};