const express = require("express");
const authMiddleware = require("../middleware/authMiddelWare");
const {getUser, updateUser , deleteUser, logoutUser} = require("../controller/user.controller");

const router = express.Router();

router.get('/' , authMiddleware , getUser);
router.put('/update' , authMiddleware , updateUser);
router.delete('/delete' , authMiddleware , deleteUser);
router.get('/logout' , authMiddleware , logoutUser);

module.exports = router