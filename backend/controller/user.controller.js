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

module.exports = {getUser};