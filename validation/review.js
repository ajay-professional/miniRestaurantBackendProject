const Joi = require('joi');

exports.addReview  = Joi.object().keys({
    reviewMessage:  Joi.string().required(),
    restaurantId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    userId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.updateReview  = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    reviewMessage:  Joi.string().required(),
    restaurantId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
    userId:  Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});

exports.id = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('must be an oid').required(),
});