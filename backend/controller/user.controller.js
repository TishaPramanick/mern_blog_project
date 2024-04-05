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


const adminDeleteUser = async(req , res , next)=>{

    const id = req?.id;

    const {userIdToDelete} = req.params;

    try {

        const checkAdmin  = await User.findById(id);
        if(!checkAdmin.isAdmin) return(error(403 , "You have no access to delete any users"));


        const findUser = await User.findById(userIdToDelete);
        if(!findUser) return(error(400 , "User not found!!"));


        res.clearCookie(`${userIdToDelete}`);

        req.cookies[`${userIdToDelete}`] = "";
    
        const deletedUser = await User.findByIdAndDelete(userIdToDelete);

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


const getUsers = async(req , res, next) => {
    const uid = req?.id;

    try {
        const user = await User.findById(uid);
        if(!user.isAdmin) return next(error(403 , "You are not an admin"));

        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const findUser = await User.find().sort({
            createdAt : sortDirection
        }).skip(startIndex).limit(limit);


        const userWithoutPassword = findUser.map((u) => {
            const {password , ...rest} = u._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();

        const now = new Date();

        const oneMonthAge = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthUsers = await User.countDocuments({
            createdAt : {$gte : oneMonthAge},
        });

        res.status(200).json({
            users : userWithoutPassword,
            totalUsers,
            lastMonthUsers
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {getUser , updateUser , deleteUser , logoutUser , getUsers , adminDeleteUser};