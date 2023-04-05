const Joi = require('joi');

exports.addRestaurant  = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    description: Joi.string().required(),
    totalReviews: Joi.string().optional().allow("")
});

exports.updateRestaurant  = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    description: Joi.string().required(),
    totalReviews: Joi.string().optional().allow("")
});

exports.id = Joi.object().keys({
    id:Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});
