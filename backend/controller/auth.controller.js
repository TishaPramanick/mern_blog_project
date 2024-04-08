const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const { error, errorHandler } = require("../utils/errorHandler");
const createToken = require("../config/jwtToken");
const jwt = require("jsonwebtoken");

// sign up
const signup = async(req , res , next)=>{
    const {name , email , password} = req.body;
    if(!name || !email || !password || name === "" || email === "" || password === "")
    {
        return next(error(400 , "All fields are required"));
    }

    const existingUser = await User.findOne({email : email});

    if(existingUser) return next(error(400 , "User with this email already exist"));

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

// sign in
const signin = async(req , res , next)=>{
    const {email , password} = req.body;
    if(!email || !password || email === "" || password === "")
    {
        return next(error(400 , "All Fields are required"));
    }
    try {

        const findUser = await User.findOne({email : email});
        if(!findUser) return next(error(404 , "User not found"));

        const comparePassword = bcrypt.compareSync(password , findUser.password);
        if(!comparePassword) return next(error(400 , "Invalid Credentials"));

        const token = createToken(findUser._id);

        const {password : pass , ...userData } = findUser._doc;

        res.cookie(findUser._id , token , {
            path : '/',
            expires : new Date(Date.now()  + 1000 * 60 * 60 * 24),
            httpOnly : true,
            sameSite : "lax"
        })

        
        
        res.status(200).json({status : true , userData});

        
    } catch (error) {
        next(error);
    }
}


// google auth

const google = async (req , res , next)=>{
    const {name , email , googlePhotoUrl} = req.body;
    try{
        const user = await User.findOne({email : email});

        if(user)
        {
            const token = createToken(user._id);
            const {password , ...userData} = user._doc;
            res.cookie(String(user._id) , token , {
                path : '/',
                expires : new Date(Date.now()  + 1000 * 60 * 60 * 24),
                httpOnly : true,
                sameSite : "lax"
            });

            res.status(200).json({status : true , userData});
        }
        else{
            // create user
            const generateRandomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const hashedPassword = bcrypt.hashSync(generateRandomPassword , 10);
            const newUser = new User({
                name : name.toLowerCase().split(" ").join('') + Math.random().toString(9).slice(-4),
                email : email,
                password : hashedPassword,
                profilePhoto : googlePhotoUrl
            });

            await newUser.save();
            const token = createToken(newUser._id);
            const {password , ...newUserData} = newUser._doc;
            res.cookie(String(newUser._id) , token , {
                path : '/',
                expires : new Date(Date.now()  + 1000 * 60 * 60 * 24),
                httpOnly : true,
                sameSite : "lax"
            });

            res.status(200).json({status : true , newUserData});
        }
    }catch(error){
        next(error);
    }
}



const refreshToken = (req , res , next) => {
   const cookie = req.headers.cookie;
   
   const prevToken = cookie.split("=")[1];

   if(!prevToken) return next(error(400 , "Authorization Failed , Please Login again"));

   jwt.verify(String(prevToken) , process.env.JWT_SECRET , (err , user)=>{
        if(err) return next(error(403 , "Error while generating token"));

        res.clearCookie(`${user.id}`);

        req.cookies[`${user.id}`] = "";
        const refreshedToken = createToken(user.id);

        res.cookie(user.id , refreshedToken , {
            path : '/',
            expires : new Date(Date.now()  + 1000 * 60 * 60 * 24 ),
            httpOnly : true,
            sameSite : "lax"
        });

        req.id = user.id;

        next();

   })
}


module.exports = {signup , signin , refreshToken , google};