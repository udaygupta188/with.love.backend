const Cart = require("../models/cartModel");

const addProductToCart = async (userId, cartItem) => {
    let cart = await Cart.findOne({ userId: cartItem.userId });

    if (!cart) {
        cart = new Cart({
            userId: userId,
            items: [cartItem],
            totalPrice: cartItem.price * cartItem.quantity,
            totalQuantity: cartItem.quantity,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    } else {
        const existingProductIndex = cart.items.findIndex(item => item.productId === cartItem.productId);

        if (existingProductIndex >= 0) {
            cart.items[existingProductIndex].quantity += cartItem.quantity;
            cart.items[existingProductIndex].price = cartItem.price;
        } else {
            cart.items.push(cartItem);
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
        cart.updatedAt = new Date();
    }

    await cart.save();
    return cart;
};
const emptyCart = async (userId) => {
    const cart = await Cart.findOne({ userId });

    if (!cart) throw new Error('Cart not found');

    cart.items = [];
    cart.totalPrice = 0;
    cart.totalQuantity = 0;
    cart.updatedAt = new Date();

    await cart.save();
    return cart;
};
const removeProductFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });

    if (!cart) throw new Error('Cart not found');

    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.updatedAt = new Date();

    await cart.save();
    return cart;
};
const updateProductQuantityInCart = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ userId });

    if (!cart) throw new Error('Cart not found');

    const productIndex = cart.items.findIndex(item => item.productId === productId);
    if (productIndex === -1) throw new Error('Product not found in cart');

    cart.items[productIndex].quantity = quantity;
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    cart.updatedAt = new Date();

    await cart.save();
    return cart;

};
const getCartItems = async (userId) => {
    return await Cart.findOne({ userId });
}

module.exports = {
    addProductToCart,
    emptyCart,
    removeProductFromCart,
    updateProductQuantityInCart,
    getCartItems
}
