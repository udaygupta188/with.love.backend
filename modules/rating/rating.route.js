const express= require('express');
const router = express.Router();
const ratingController = require('./rating.controller')

router.post('/add-rating', ratingController.addRating);


module.exports= router