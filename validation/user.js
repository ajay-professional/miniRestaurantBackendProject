const Joi = require('joi');

exports.login = Joi.object().keys({
    phoneNumber: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(6).max(6).required()
});

exports.signUp = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    password: Joi.string().min(6).max(6).required()
});

exports.id = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

