const Joi = require('joi');

exports.adminLogin = Joi.object().keys({
    phoneNumber: Joi.string().min(10).max(10).required(),
    password: Joi.string().required()
});

exports.adminSignUp = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    password: Joi.string().required()
});

exports.id = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});