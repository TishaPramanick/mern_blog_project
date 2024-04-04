const User = require("../model/user.model");
const {error} = require("../utils/errorHandler");
const getUser = async(req , res, next)=>{

    const userId = req?.id;

    try {
        const findUser = await User.findById(userId , "-password");
        if(!findUser) return next(error(404 , "Please login first"));

        res.status(200).json(findUser);
    } catch (error) {
        next(error)
    }
}

const updateUser = async(req , res , next)=>{

    if(!req?.id) return next(error(404 , "Please Login"));

    let {name , email , profilePicture} = req.body;

    if(!name || !email)
    {
       return res.json("All Field Are Required");
    }

    const cookie = req.headers.cookie;

    const userId = cookie.split("=")[0];
    console.log(profilePicture);

    try {
        if(!profilePicture)
        {
            const findDefaultProfile = await User.findById(userId);
            profilePicture = findDefaultProfile.profilePhoto;
        }
        const updatedUser = await User.findByIdAndUpdate(userId , {
            name : name ,
            email : email ,
            profilePhoto : profilePicture
        } , 
        {
            new : true
        });

        const {password , ...userData} = updatedUser._doc;
        res.json({status : true , userData});
    } catch (error) {
        console.log(error);
        next(error);
    }

}

const deleteUser = async(req , res , next)=>{

    if(!req?.id) return next(error(404 , "Please Login"));

    const cookie = req.headers.cookie;

    const userId = cookie.split("=")[0];

    try {
       
        res.clearCookie(`${userId}`);

        req.cookies[`${userId}`] = "";
    
        const deletedUser = await User.findByIdAndDelete(userId);

        res.json({status : true});
    } catch (error) {
        console.log(error);
        next(error);
    }

}

const logoutUser = async(req , res , next)=>{

    if(!req?.id) return next(error(404 , "Please Login"));

    const cookie = req.headers.cookie;

    const userId = cookie.split("=")[0];

    try {
       
        res.clearCookie(`${userId}`);

        req.cookies[`${userId}`] = "";

        res.json({status : true});

    } catch (error) {
        console.log(error);
        next(error);
    }

}

module.exports = {getUser , updateUser , deleteUser , logoutUser};