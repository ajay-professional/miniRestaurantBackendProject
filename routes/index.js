const express = require('express');
const adminRoots = require('./admin');
const restaurantRoots = require('./restaurant');
const reviewRoots = require('./review');
const userRoots = require('./user');

const router = express.Router();

router.use('/admin', adminRoots);
router.use('/restaurant', restaurantRoots);
router.use('/review', reviewRoots);
router.use('/user', userRoots);

module.exports = router;
