const orderService = require('../services/orderService');
const createOrder = async(req, res)=>{
    try{
        await orderService.createOrder(req.body)
    }catch(error){

    }
}