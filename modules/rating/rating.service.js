const Rating = require("./rating.model")

const addRating = async (userId, productId, rate) => {

    const rating = new Rating({
        userId,
        productId,
        rate
    })
    return await rating.save();

}

module.exports = {
    addRating,

}