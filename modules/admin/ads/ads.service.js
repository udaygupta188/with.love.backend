const Ads = require("./ads.model")


const createAds = async (payload) => {
    try {
        const result = new Ads(payload);
        return await result.save()

    } catch (error) {
        throw new Error(error.message)
    }
}
const updateAds = async (id, payload) => {
    try {
        const result = await Ads.findByIdAndUpdate(id, payload);
        return result
    } catch (error) {
        throw new Error(error.message)
    }
}
const deleteAds = async (id) => {
    try {
    const result = await Ads.findByIdAndDelete(id);
    return result;
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createAds,
    updateAds,
    deleteAds
}