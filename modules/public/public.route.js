const express = require('express');
const router = express.Router();
const controller = require('./public.controller');
const roleController = require('../admin/role/role.controller');
const categoryController = require('../admin/category/category.controller');
const influencerController = require('../influencer/influencer.controller');
const publicController = require('./public.controller');

router.get('/countries', controller.getCountries);
router.get('/fetch-roles',roleController.getAllRoles);

router.get('/get-category',categoryController.getAllCategories);
router.get('/get-sub-category',categoryController.getSubCategories);
router.get('/get-influencer-details/:userId',influencerController.getInfluencer);
router.get('/product-suggestions',publicController.productSuggestion);
router.get('/curators-suggestions',publicController.curatorsSuggestion)

router.get('/search',publicController.globalSearch);

// router.get('/get-adds',()=>{});


module.exports =router