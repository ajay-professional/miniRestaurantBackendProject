const { size } = require('lodash');
const utils = require('../utils/apiHelper');
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const { Restaurant } = require('../models');

exports.addRestaurant = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.saveData(Restaurant, pararms);
    return sendSuccessMessage('success', data, res);
};
exports.updateRestaurant = async (payloadData, res) => {
    const pararms = payloadData.body;
    const data = await utils.updateData(Restaurant, { _id: pararms.id }, pararms);
    return sendSuccessMessage('success', data, res);
};
exports.deleteRestaurant = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Restaurant, { _id: pararms.id }, { isDeleted: true });
    return sendSuccessMessage('success', {}, res);
};
exports.getAllRestaurant = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(Restaurant, {
        query: { isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};
exports.getRestaurantById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(Restaurant, { 
        query: { _id: pararms.id, isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};