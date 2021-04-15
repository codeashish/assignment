const express = require("express");
const router = express.Router();
const {cities}=require('./../controller/cities')
router.route('/').get(cities)

module.exports =router
