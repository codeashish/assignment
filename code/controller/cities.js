const asyncHandler = require('../middleware/async');
const cities=require('./../models/City')

exports.cities = asyncHandler(async (req, res, next) => {
	const value=req.query

	console.log(value)
	let data=await cities.find().limit(50)
	res.status(201).send({ success: true, data });

});
