const express = require("express");
const {signup , signin , getUser , refreshToken} = require("../controller/auth.controller");
const authMiddleware = require("../middleware/authMiddelWare");
const route = express.Router();

route.post('/sign-up' , signup);
route.post('/sign-in' , signin);
route.get('/user' , authMiddleware , getUser);
route.get('/refresh'  , refreshToken , authMiddleware , getUser);

module.exports = route;