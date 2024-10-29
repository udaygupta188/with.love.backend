const Order = require("./order.model")


const getOrders = async () => {
    try {
        const orders = await Order.find();
        return {
            status: true,
            data: orders
        }
    } catch (error) {
        throw new Error('Error Occured while fetch orders')
    }
}

const getUserOrders = async (userId) => {
    try {
        const orders = await Order.find({ userId });
        return {
            status: true,
            data: orders
        }
    } catch (error) {
        throw new Error('Error Occured while fetch orders')
    }
}

const getOrderDetail = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        return {
            status: true,
            data: order
        }
    } catch (error) {
        throw new Error(`Error Occured while fetch orders `)
    }
}

const checkPurchase = async (userId, productId) => {
    try {
        const order = await Order.findOne({ userId: userId, productId: productId });
        if (!order) {
            return {
                status: true,
                data: false
            }
        }
        return {
            status: true,
            data: true
        }
    } catch (error) {
        throw new Error('Error Occured while checking purchas status')
    }
}

module.exports = {
    getOrders,
    getUserOrders,
    getOrderDetail,
    checkPurchase
}