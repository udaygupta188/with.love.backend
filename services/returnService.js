const Return = require('../models/returnModel');

const createReturn = async (data) => {
    const newReturn = new Return(data);
    return await newReturn.save();
};
const getAllReturns = async (data) => {

};
const getReturnById = async (data) => {

};
const updateReturn = async (data) => {

};
const deleteReturn = async (data) => {

}


module.exports = {
    createReturn,
    getAllReturns,
    getReturnById,
    updateReturn,
    deleteReturn

};
