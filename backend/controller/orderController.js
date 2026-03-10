import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
// import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import handleAsynError from '../middleware/handleAsyncError.js';

// Create New Order
export const createNewOrder = handleAsynError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(201).json({
        success: true,
        order
    })
})

// Getting Single Order
export const getSingleOrder = handleAsynError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if (!order) {
        return next(new HandleError("No order found", 404));
    }
    res.status(200).json({
        success: true,
        order
    })
})

// All My Orders
export const allMyOrders = handleAsynError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })
    if (!orders) {
        return next(new HandleError("No order found", 404));
    }
    res.status(200).json({
        success: true,
        orders
    })
})

// Getting All Orders
export const getAllOrders = handleAsynError(async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })
    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
})

// Update Order Status
export const updateOrderStatus = handleAsynError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new HandleError("No order found", 404));
    }
    if (order.orderStatus === 'Delivered') {
        return next(new HandleError("This order is already delivered", 400));
    }
    await Promise.all(order.orderItems.map(item => updateQuantity(item.product, item.quantity)))
    order.orderStatus = req.body.status;
    if (order.orderStatus === 'Delivered') {
        order.deliverdAt = Date.now();
    }
    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        order
    })
})
async function updateQuantity(id, quantity) {
    const product = await Product.findById(id);
    if (!product) {
        throw new Error("Product not found");
    }
    if (product.stock < quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
    }
    product.stock -= quantity
    await product.save({ validateBeforeSave: false })
}

// Deleting Order
export const deleteOrder = handleAsynError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new HandleError("No order found", 404));
    }
    if (order.orderStatus !== 'Delivered') {
        return next(new HandleError("This order is under processing and can't be deleted", 400));
    }
    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    })
})