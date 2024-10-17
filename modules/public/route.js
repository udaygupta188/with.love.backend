const express = require('express');
const router = express.Router();
const controller = require('./controller');
const roleController = require('../admin/role/controller');
const categoryController = require('../admin/category/controller');
const influencerController = require('../influencer/controller');

router.get('/countries', controller.getCountries);
router.get('/fetch-roles',roleController.getAllRoles);

router.get('/get-category',categoryController.getAllCategories);
router.get('/get-sub-category',categoryController.getSubCategories);
router.get('/get-influencer-details/:userId',influencerController.getInfluencer);
// router.get('/show-suggestions',()=>{});
// router.get('/search',()=>{});

// router.get('/get-adds',()=>{});


module.exports =router