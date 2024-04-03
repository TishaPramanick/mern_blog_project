const express = require("express");
const {signup , signin , refreshToken , google} = require("../controller/auth.controller");
const {getUser} = require("../controller/user.controller");
const authMiddleware = require("../middleware/authMiddelWare");
const route = express.Router();

route.post('/sign-up' , signup);
route.post('/sign-in' , signin);
route.post('/google' , google);
route.get('/refresh'  , refreshToken , authMiddleware , getUser);

module.exports = route;