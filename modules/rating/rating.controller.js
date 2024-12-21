const { apiErrorResponse, HTTP_STATUS } = require("../../utils")
const ratingService= require('./rating.service')
const addRating = async(req, res)=>{
    try {
        const {userId, productId, rate }=req.body
        const rating = ratingService.addRating(userId, productId, rate )
        
    } catch (error) {
        apiErrorResponse(res, 'Internal Server Error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

module.exports ={
    addRating
}