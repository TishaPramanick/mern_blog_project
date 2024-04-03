const express = require("express");
const authMiddleware = require("../middleware/authMiddelWare");
const {getUser} = require("../controller/user.controller");

const router = express.Router();

router.get('/' , authMiddleware , getUser);

module.exports = router