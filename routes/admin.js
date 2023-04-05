const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminLogin, adminSignUp, id } = require('../validation/admin');


router.post('/login', validator.body(adminLogin), adminController.login);
router.post('/signUp', validator.body(adminSignUp), adminController.signUp);
router.delete('/delete', validator.query(id), adminController.deleteAdmin);
router.get('/getAll', adminController.getAllAdmin);
router.get('/getById', validator.query(id), adminController.getAdminById);

module.exports = router;
