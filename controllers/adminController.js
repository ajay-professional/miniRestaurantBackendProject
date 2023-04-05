const Jwt = require('jsonwebtoken');
const { size } = require('lodash');
const moment = require('moment');
const { Admin } = require('../models');
const commonHelper = require('../helpers/common');
const utils = require('../utils/apiHelper');
const env = require('../config');

const privateKey = env.JWTOKEN;
const { sendErorMessage, sendSuccessMessage } = require('../helpers/sendResponse');
const logger = require('../helpers/logger');

exports.login = async (payloadData, res) => {
    const pararms = payloadData.body;

    const checkPhoneAlreadyExist = await utils.getData(Admin, {
        query: { phoneNumber: pararms.phoneNumber, isDeleted: false },
        fields: ['_id', 'firstName', 'lastName', 'phoneNumber', 'password'],
    });
    if (!size(checkPhoneAlreadyExist)) {
        return sendErorMessage('This Phone is not registered with us.', {}, res);
    }
    const checkPasswordBoolean = await commonHelper.comparePassword(pararms.password, checkPhoneAlreadyExist[0].password);
    if (!checkPasswordBoolean) return sendErorMessage('Password is incorrect!', {}, res);
    const tokenData = {
        phoneNumber: checkPhoneAlreadyExist[0].phoneNumber,
        _id: checkPhoneAlreadyExist[0]._id,
        date: moment().toDate(),
    };
    const token = Jwt.sign(tokenData, privateKey, { expiresIn: '90d' });
    const data = {
        token,
        name: `${checkPhoneAlreadyExist[0].firstName} ${checkPhoneAlreadyExist[0].lastName}`,
    };
    logger.info(`${checkPhoneAlreadyExist[0]._id} ${moment().toDate()}`);
    return sendSuccessMessage('successfully logged in', data, res);
};

exports.signUp = async (payloadData, res) => {
    const pararms = payloadData.body;

    const checkPhoneAlreadyExist = await utils.getData(Admin, {
        query: { phoneNumber: pararms.phoneNumber, isDeleted: false },
        fields: ['_id', 'firstName', 'lastName', 'phoneNumber', 'password']
    });
    if (size(checkPhoneAlreadyExist)) return sendErorMessage('This phoneNumber is already registered with us.', {}, res);
    const passwordHash = await commonHelper.generateNewPassword(pararms.password);
    const obj = {
        firstName: pararms.firstName,
        lastName: pararms.lastName,
        phoneNumber: pararms.phoneNumber,
        password: passwordHash
    };
    await utils.saveData(Admin, obj);
    return sendSuccessMessage('successfully registered', {}, res);
};
exports.deleteAdmin = async (payloadData, res) => {
    const pararms = payloadData.query;
    await utils.updateData(Admin, { _id: pararms.id }, { isDeleted: true });
    return sendSuccessMessage('success', {}, res);
};
exports.getAllAdmin = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(Admin, {
        query: { isDeleted: false },
    });
    return sendSuccessMessage('success', data, res);
};
exports.getAdminById = async (payloadData, res) => {
    const pararms = payloadData.query;
    const data = await utils.getData(Admin, { query: { _id: pararms.id, isDeleted: false } });
    return sendSuccessMessage('success', data, res);
};
