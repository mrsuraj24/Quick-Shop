import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../features/order/orderSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { removeErrors, removeSuccess, updateOrderStatus } from '../features/admin/adminSlice';

function UpdateOrder() {
    const [status, setStatus] = useState("");
    const { orderId } = useParams();
    const { order, loading: orderLoading } = useSelector(state => state.order);
    const { success, loading: adminLoading, error } = useSelector(state => state.admin);
    const loading = orderLoading || adminLoading;
    const dispatch = useDispatch();
    useEffect(() => {
        if (orderId) {
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, orderId]);
    const {
        shippingInfo = {},
        orderItems = [],
        paymentInfo = {},
        orderStatus,
        totalPrice
    } = order
    const paymentStatus = paymentInfo.status === 'succeeded' ? "Paid" : "Not Paid"
    const finalOrderStatus = paymentStatus === "Not Paid" ? "Cancelled" : orderStatus
    const handleStatusUpdate = () => {
        if (!status) {
            toast.error("Please select a status", { position: 'top-center', autoClose: 3000 })
            return
        }
        dispatch(updateOrderStatus({ orderId, status }))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
        if (success) {
            toast.success("Order status updated successfully", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, error, success, orderId])
    return (
        <><Navbar />
            <PageTitle title="Update Order" />
            {loading ? (<Loader />) : (
                <div className="min-h-screen bg-gray-900 text-white mt-16 p-4 md:p-6">
                    <h1 className="text-2xl font-semibold mb-6 text-center">Update Order</h1>
                    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 mb-6">
                        <h2 className="text-lg font-medium mb-4">Order Information </h2>
                        <p><strong className="text-gray-400">Order Id : </strong>{orderId}</p>
                        <p><strong className="text-gray-400">Shipping Info : </strong>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}-{shippingInfo.pincode}</p>
                        <p><strong className="text-gray-400">Phone No. : </strong>{shippingInfo.phoneNo}</p>
                        <p><strong className="text-gray-400">Order Status : </strong>
                            <span className={`px-2 py-1 rounded text-xs ${finalOrderStatus === "Delivered" ? "bg-green-600/20 text-green-400"
                                : finalOrderStatus === "Shipped" ? "bg-blue-600/20 text-blue-400" : "bg-yellow-600/20 text-yellow-400"}`}>
                                {finalOrderStatus}
                            </span></p>
                        <p><strong className="text-gray-400">Payment Status : </strong>{paymentStatus}</p>
                        <p><strong className="text-gray-400">Total Price : </strong>₹ {totalPrice}/-</p>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 mb-6">
                        <h2 className="text-lg font-medium mb-4">Order Items</h2>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-800 text-gray-300">
                                    <tr>
                                        <th className="p-3 text-left">Image</th>
                                        <th className="p-3 text-left">Name</th>
                                        <th className="p-3 text-left">Qty</th>
                                        <th className="p-3 text-left">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map((item) => (
                                        <tr key={item._id} className="border-t border-gray-700 hover:bg-gray-800">
                                            <td><img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-gray-700" /></td>
                                            <td className="p-3 text-gray-200">{item.name}</td>
                                            <td className="p-3 text-gray-200">{item.quantity}</td>
                                            <td className="p-3 text-gray-200">{item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Mobile Cart */}
                        <div className="md:hidden space-y-4">
                            {orderItems.map((item) => (
                                <div key={item._id} className="border border-gray-700 rounded-lg p-4 flex gap-3">
                                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
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
                    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 max-w-md">
                        <h2 className="text-lg font-medium mb-4">Update Status</h2>
                        <select className="w-full mb-4 rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading || orderStatus === 'Delivered'}>
                            <option value="">Select Status</option>
                            <option value="Shipped">Shipped</option>
                            <option value="On the way">On the way</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                        <button className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium disabled:opacity-50" onClick={handleStatusUpdate} disabled={loading || !status || orderStatus === 'Delivered'}>
                            Update Status
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}

export default UpdateOrder