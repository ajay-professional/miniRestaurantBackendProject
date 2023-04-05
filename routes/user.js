const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const userController = require('../controllers/userController');
const { login, signUp, id } = require('../validation/user');

router.post('/login', validator.body(login), userController.login);
router.post('/signUp', validator.body(signUp), userController.signUp);
router.delete('/delete', validator.query(id), userController.deleteUser);
router.get('/getAll', userController.getAllUser);
router.get('/getById', validator.query(id), userController.getUserById);

module.exports = router;

