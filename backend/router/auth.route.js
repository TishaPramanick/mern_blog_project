const express = require("express");
const {signup} = require("../controller/auth.controller");
const route = express.Router();

route.post('/sign-up' , signup);

module.exports = route;