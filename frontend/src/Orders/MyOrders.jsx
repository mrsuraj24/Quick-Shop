import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Navbar from '../components/Navbar.jsx';
import Footer from "../components/Footer"
import { LaunchOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllMyOrders, removeErrors } from "../features/order/orderSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

export default function MyOrders() {
    const { orders, loading, error } = useSelector(state => state.order);
    console.log(orders)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllMyOrders())
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    return (
        <>
            <Navbar />
            <PageTitle title="My Orders" />
            {loading ? (<Loader />) : orders.length > 0 ? (
                <div className="min-h-screen bg-gray-900 mt-16 text-white p-4 md:p-6">
                    <h1 className="text-2xl font-semibold text-center mb-6">My Orders</h1>
                    <div className="hidden md:block overflow-x-auto bg-gray-900/50 border border-gray-700 rounded-xl">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-800 text-gray-300">
                                <tr>
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Items</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Total</th>
                                    <th className="p-3 text-left">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="border-t border-gray-700 hover:bg-gray-800">
                                        <td className="p-3 text-gray-400 break-all">{order._id}</td>
                                        <td className="p-3">{order.orderItems.length}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs ${order.orderStatus === "Delivered" ? "bg-green-600/20 text-green-400"
                                                : order.orderStatus === "Cancelled" ? "bg-red-600/20 text-red-400" : "bg-yellow-600/20 text-yellow-400"}`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="p-3">₹ {order.itemPrice}/-</td>
                                        <td className="p-3">
                                            <Link to={`/order/${order._id}`} className="inline-flex items-center justify-center p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700">
                                                <LaunchOutlined fontSize="small" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
                                <p className="text-xs text-gray-400 break-all mb-2">
                                    {order._id}
                                </p>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Items: {order.orderItems.length}</span>
                                    <span>₹ {order.itemPrice}/-</span>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className={`px-2 py-1 rounded text-xs ${order.orderStatus === "Delivered" ? "bg-green-600/20 text-green-400" : order.orderStatus === "Cancelled" ? "bg-red-600/20 text-red-400" : "bg-yellow-600/20 text-yellow-400"}`}>
                                        {order.orderStatus}
                                    </span>
                                    <Link to={`/order/${order._id}`} className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm">
                                        View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            ) : (
                <div className="min-h-screen flex flex-col items-center justify-center mt-16 bg-gray-900 text-gray-400">
                    <p className="mb-4 text-lg">No orders found</p>
                    <Link to='/products' className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
                        Browse Products
                    </Link>
                </div>
            )}
            <Footer />
        </>
    )
}