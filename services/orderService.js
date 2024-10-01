const Order = require("../models/orderModel");

const createOrder = async (orderData) => {
    try {
        if (!orderData.name) {
            throw new Error('Order name is required.');
        }

        const order = new Order({
        });

        const savedOrder = await order.save();

        return {
            message: 'order created successfully.',
            order: savedOrder,
            status:true
        };
    } catch (error) {
        throw new Error(`Error creating order: ${error.message}`);
    }
};
const getOrders = async (reuestedData) => {
    try {
        const { limit = 10, page = 1 } = reuestedData
        const skip = (page - 1) * limit;
        const orders = await Order.find().skip(skip).limit(limit).exec();

        const totalCount = await Order.countDocuments().exec();

        return {
            orders: orders,
            totalCount: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        }

    } catch (error) {
        console.error('Error fetching orders:', error.message);
        throw error;
    }
}
const getOrderById = async (id, requestedData) => {
    try {
        const { id } = requestedData;
        const order = await Order.findById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    } catch (error) {
        console.error('Error fetching order:', error.message);
        throw error;
    }
}
const updateOrder = async (requestData) => {
    try {

        const updateOrder = await Order.findOneAndUpdate({ _id: id }, requestData, { new: true })
        return {
            order:updateOrder,
            message:"Order updated successfully"
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder
}