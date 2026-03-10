import { useEffect } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, deleteOrder, fetchAllOrders, removeErrors, removeSuccess } from '../features/admin/adminSlice'
import { toast } from 'react-toastify'

function OrdersList() {
    const { orders, loading, error, success, message } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllOrders())
    }, [dispatch])
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure! you want to delete this order");
        if (confirm) {
            dispatch(deleteOrder(id))
        }
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
        if (success) {
            toast.success(message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess());
            dispatch(clearMessage());
            dispatch(fetchAllOrders());
        }
    }, [dispatch, error, success, message])
    if (orders && orders.length === 0) {
        return (
            <>
                <PageTitle title="All Orders" />
                <Navbar />
                <div className="min-h-screen mt-16 flex items-center justify-center bg-gray-900 text-gray-400">
                    <p>No Orders Found</p>
                </div>
                <Footer />
            </>
        )
    }
    return (
        <>
            {loading ? (<Loader />) : (<>
                <PageTitle title="All Orders" />
                <Navbar />
                <div className="min-h-screen bg-gray-900 text-white p-4 mt-16 md:p-6">
                    <h1 className="text-2xl font-semibold mb-6 text-center">All Orders</h1>
                    <div className="hidden md:block overflow-x-auto bg-gray-900/50 border border-gray-700 rounded-xl">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-800 text-gray-300">
                                <tr>
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Order ID</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Total Price</th>
                                    <th className="p-3 text-left">Number of Items</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map((order, index) => (
                                    <tr key={order._id} className="border-t border-gray-700 hover:bg-gray-800">
                                        <td className="p-3 text-white">{index + 1}</td>
                                        <td className="p-3 text-gray-200">{order._id}</td>
                                        <td className={`px-2 py-1 rounded text-xs font-medium ${order.orderStatus === "Delivered" ? "bg-green-600/20 text-green-400" : order.orderStatus === "Shipped" ? "bg-blue-600/20 text-blue-400" : "bg-yellow-600/20 text-yellow-400"} `}>{order.orderStatus}</td>
                                        <td className="p-3 text-white">₹ {order.totalPrice.toFixed(2)}/-</td>
                                        <td className="p-3 text-white">{order.orderItems.length}</td>
                                        <td className="p-3 flex gap-2">
                                            <Link to={`/admin/order/${order._id}`} className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"><Edit fontSize="small" /> </Link>
                                            <button onClick={() => handleDelete(order._id)} className="p-2 rounded-lg bg-red-600 hover:bg-red-700"><Delete fontSize="small" /></button>
                                        </td>
                                    </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <div className="md:hidden space-y-4">
                        {orders.map((order, index) => (
                            <div key={order._id} className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-400">
                                        Order #{index + 1}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded ${order.orderStatus === "Delivered" ? "bg-green-600/20 text-green-400"
                                        : order.orderStatus === "Shipped" ? "bg-blue-600/20 text-blue-400" : "bg-yellow-600/20 text-yellow-400"}`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-200 break-all mb-2">
                                    {order._id}
                                </p>
                                <div className="flex justify-between text-sm mb-3">
                                    <span>Total: ₹ {order.totalPrice.toFixed(2)}</span>
                                    <span>Items: {order.orderItems.length}</span>
                                </div>
                                <div className="flex gap-3">
                                    <Link to={`/admin/order/${order._id}`} className="flex-1 text-center py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(order._id)} className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </>
            )}
        </>
    )
}

export default OrdersList