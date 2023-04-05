const { lowerCase, size } = require('lodash');
const utils = require('../utils/apiHelper');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Review, Restaurant} = require('../models');

exports.addReview = async (payloadData, res) => {
    let totalReviews;
    const pararms = payloadData.body;
    const data = await utils.saveData(Review, pararms);
    const restaurant = await utils.getData(Restaurant, {
        query: { _id:`${data.restaurantId}`,isDeleted: false },
        fields:['_id','totalReviews'],
    });
    totalReviews = parseInt(restaurant[0].totalReviews);
    totalReviews += 1;
    totalReviews = JSON.stringify(totalReviews);
    await utils.updateData(Restaurant, { _id:`${data.restaurantId}` }, { totalReviews: totalReviews });
    return sendSuccessMessage('success', data, res);
};
exports.updateReview = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(Review, { _id: pararms.id }, pararms);
    return sendSuccessMessage('success', data, res);
};
exports.deleteReview = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Review, { _id: pararms.id }, { isDeleted: true });
    return sendSuccessMessage('success', {}, res);
};
exports.getAllReview = async (payloadData, res) => {
    const populates = ['restaurantId', 'userId'];
    const data = await utils.getData(Review, {
        query: { isDeleted: false },
        populates,
    });
    return sendSuccessMessage('success', data, res);
};
exports.getReviewById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const populates = ['restaurantId', 'userId'];
    const data = await utils.getData(Review, {
        query: { _id: pararms.id, isDeleted: false },
        populates,
    });
    return sendSuccessMessage('success', data, res);
};
