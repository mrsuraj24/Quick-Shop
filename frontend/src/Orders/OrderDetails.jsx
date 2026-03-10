import { useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar.jsx';
import Footer from "../components/Footer"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrderDetails, removeErrors } from '../features/order/orderSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
function OrderDetails() {
    const { orderId } = useParams();
    const { order, loading, error } = useSelector(state => state.order);
    const dispatch = useDispatch();
    console.log(order)
    useEffect(() => {
        dispatch(getOrderDetails(orderId));
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error, orderId])
    const { shippingInfo = {}, orderItems = [], paymentInfo = {}, orderStatus, totalPrice, taxPrice, shippingPrice, itemPrice, paidAt } = order;
    const paymentStatus = paymentInfo.status === "succeeded" ? "Paid" : "Not Paid"
    const finalOrderStatus = paymentStatus === "Not Paid" ? "Cancelled" : orderStatus;
    return (
        <>
            <Navbar />
            <PageTitle title={orderId} />
            {loading ? (<Loader />) : (
                <div className="min-h-screen bg-gray-900 text-white mt-16 p-4 md:p-6">
                    <div className="max-w-6xl mx-auto space-y-6">
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
                            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-800 text-gray-300">
                                        <tr>
                                            <th className="p-3 text-left">Image</th>
                                            <th className="p-3 text-left">Name</th>
                                            <th className="p-3 text-left">Quantity</th>
                                            <th className="p-3 text-left">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderItems.map((item, index) => (
                                            <tr className="border-t border-gray-700 text-white hover:bg-gray-800" key={item.product || index}>
                                                <td className="p-3">
                                                    <img src={item.image} className="w-12 h-12 rounded-lg object-cover border border-gray-700" alt={item.name} />
                                                </td>
                                                <td className="p-3">{item.name}</td>
                                                <td className="p-3">{item.quantity}</td>
                                                <td className="p-3">₹ {item.price}/-</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="md:hidden space-y-4">
                                {orderItems.map((item, index) => (
                                    <div key={item.product || index} className="flex gap-3 border border-gray-700 rounded-lg p-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-14 h-14 rounded object-cover" />
                                        <div className="text-sm">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-gray-400">
                                                Qty: {item.quantity}
                                            </p>
                                            <p className="text-gray-400">
                                                ₹ {item.price}/-
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* shipping info table */}
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
                            <h2 className="text-xl font-semibold mb-4">Shipping Info</h2>
                            <table className="text-sm space-y-2 text-gray-300">
                                <tbody>
                                    <tr>
                                        <th className="text-gray-400">Address: </th>
                                        <td className="text-gray-400">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.pincode}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-gray-400">Phone: </th>
                                        <td className="text-gray-400">{shippingInfo.phoneNo}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Order summary  */}
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Order Status</span>
                                    <span className={`px-2 py-1 rounded text-xs ${finalOrderStatus === "Delivered" ? "bg-green-600/20 text-green-400" : finalOrderStatus === "Cancelled" ? "bg-red-600/20 text-red-400" : "bg-yellow-600/20 text-yellow-400"}`}>
                                        {finalOrderStatus}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Payment Status</span>
                                    <span className={`px-2 py-1 rounded text-xs${paymentStatus === "Paid" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}>
                                        {paymentStatus}
                                    </span>
                                </div>
                                {paidAt && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Paid At</span>
                                        <span>{new Date(paidAt).toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Item Price</span>
                                    <span>₹ {itemPrice}/-</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-400">Tax</span>
                                    <span>₹ {taxPrice}/-</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-400">Shipping</span>
                                    <span>₹ {shippingPrice}/-</span>
                                </div>
                                <div className="flex justify-between font-semibold border-t border-gray-700 pt-3">
                                    <span>Total</span>
                                    <span>₹ {totalPrice}/-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}

export default OrderDetails