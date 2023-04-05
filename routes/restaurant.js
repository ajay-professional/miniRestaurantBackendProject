const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const restaurantController = require('../controllers/restaurantController');
const { addRestaurant, updateRestaurant, id} = require('../validation/restaurant');

router.post('/add', authentication, validator.body(addRestaurant), restaurantController.addRestaurant);
router.put('/update', authentication, validator.body(updateRestaurant), restaurantController.updateRestaurant);
router.delete('/delete', authentication, validator.query(id), restaurantController.deleteRestaurant);
router.get('/getAll', authentication, restaurantController.getAllRestaurant);
router.get('/getById', authentication, validator.query(id), restaurantController.getRestaurantById);

module.exports = router;
