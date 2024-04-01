const express = require("express");
const {signup , signin} = require("../controller/auth.controller");
const route = express.Router();

route.post('/sign-up' , signup);
route.post('/sign-in' , signin);

module.exports = route;