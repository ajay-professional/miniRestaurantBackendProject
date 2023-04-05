const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const authentication = require('../middlewares/jwtToken');
const reviewController = require('../controllers/reviewController');
const { addReview, updateReview, id} = require('../validation/Review');


router.post('/add', authentication, validator.body(addReview), reviewController.addReview);
router.put('/update', authentication, validator.body(updateReview), reviewController.updateReview);
router.delete('/delete', authentication, validator.query(id), reviewController.deleteReview);
router.get('/getAll', authentication, reviewController.getAllReview);
router.get('/getById', authentication, validator.query(id), reviewController.getReviewById);

module.exports = router;
