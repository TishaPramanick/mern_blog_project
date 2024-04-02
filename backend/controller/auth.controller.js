const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const { error, errorHandler } = require("../utils/errorHandler");
const createToken = require("../config/jwtToken");
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

const signin = async(req , res , next)=>{
    const {email , password} = req.body;
    if(!email || !password || email === "" || password === "")
    {
        return next(error(400 , "All Fields are required"));
    }
    try {
        const findUser = await User.findOne({email : email}).populate("password");
        if(!findUser) return next(error(404 , "User not found"));

        const comparePassword = bcrypt.compareSync(password , findUser.password);
        if(!comparePassword) return next(error(400 , "Invalid Credentials"));

        const token = createToken(findUser);

        const {password : pass , ...userData} = findUser._doc;

        res.status(200).cookie("access-token" , token , {
            httpOnly : true
        }).json({status : true , userData});

        
    } catch (error) {
        next(error);
    }
}

module.exports = {signup , signin};