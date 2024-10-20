const GeneralSetting = require("./generalSetting.model");


const createGeneralSetting = async (data) => {
    return await GeneralSetting.create(data);
};

const getAllGeneralSettings = async () => {
    return await GeneralSetting.find();
};

const getGeneralSettingById = async (id) => {
    return await GeneralSetting.findById(id);
};

const updateGeneralSetting = async (id, data) => {
    return await GeneralSetting.findByIdAndUpdate(id, data, { new: true });
};

const deleteGeneralSetting = async (id) => {
    return await GeneralSetting.findByIdAndDelete(id);
};

module.exports = {
    createGeneralSetting,
    getAllGeneralSettings,
    getGeneralSettingById,
    updateGeneralSetting,
    deleteGeneralSetting
};
