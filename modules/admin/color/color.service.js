const Color = require("./color.model");

const createColor = async (colorData) => {
    try {
        const newColor = new Color(colorData);

        await newColor.save();

        if (!newColor) {
            return { status: false, msg: "No color added" }
        }
        return {
            status: true, msg: "New Color added successfully", colors: newColor
        }
    } catch (error) {
        throw new Error('Error Occured during color add')
    }
}
const getColors = async (params) => {
    try {
        const { page = 1, limit = 10 } = params;
        const skip = page * limit;

        const res = await Color.find({})
        if (!res.length) {
            return { status: false, msg: "No Color Found", color:res }
        }

        return { status: true, msg: "All Color Found", colors: res }
    } catch (error) {
        throw new Error('Error Occured during color get')
    }
}
const updateColor = async (colorId, colorData) => {
    try {

        const colorDetail = await Color.findOneAndUpdate({ _id: colorId }, colorData, { new: true });

        if (!colorDetail) {
            return { status: false, msg: "No color updated" }
        }
        return {
            status: true, msg: 'Color Updated succesasfully', color: colorDetail
        }
    } catch (error) {
        throw new Error('Error Occured during color update')
    }
}
const deleteColor = async (colorId) => {
    try {
        const colorDetail = await Color.findOneAndDelete({ _id: colorId });
        return { status: true, msg: "cColor deleted successfully" }
    } catch (error) {
        throw new Error('Error Occured during color delete')
    }
}



module.exports = {
    createColor,
    getColors,
    updateColor,
    deleteColor
}