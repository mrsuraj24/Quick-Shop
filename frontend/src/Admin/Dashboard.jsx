import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import { AddBox, AttachMoney, CheckCircle, Dashboard as DashboardIcon, Error, Facebook, Instagram, Inventory, LinkedIn, People, ShoppingCart, Star, YouTube } from '@mui/icons-material'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAdminProducts, fetchAllOrders } from '../features/admin/adminSlice';

function Dashboard() {
    const { products, orders, totalAmount } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAdminProducts())
        dispatch(fetchAllOrders())
    }, [dispatch])

    const safeProducts = Array.isArray(products) ? products : [];
    const safeOrders = Array.isArray(orders) ? orders : [];
    const totalProducts = safeProducts.length;
    const totalOrders = safeOrders.length;
    const outOfStock = safeProducts.filter(product => product.stock === 0).length;
    const inStock = safeProducts.filter(product => product.stock > 0).length;
    const totalReviews = safeProducts.reduce((acc, product) => acc + (Array.isArray(product.reviews) ? product.reviews.length : 0), 0)
    return (
        <>
            <PageTitle title="Admin Dashboard" />
            <Navbar />
            <div className="min-h-screen flex bg-black text-teal-600 mt-16">
                <aside className="w-64 border-2 border-teal-700/20">
                    <div className="flex items-center gap-2 p-6 text-xl font-bold">
                        <DashboardIcon />
                        Admin Dashboard
                    </div>
                    <nav className="flex-1 px-4 space-y-6 text-sm">
                        <div>
                            <h3 className="text-gray-400 mb-2">Products</h3>
                            <Link to="/admin/products" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800">
                                <Inventory fontSize="small" />All Products
                            </Link>
                            <Link to="/admin/product/create" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800">
                                <AddBox fontSize="small" />Create Product
                            </Link>
                        </div>
                        <div>
                            <h3 className="text-gray-400 mb-2">Users</h3>
                            <Link to="/admin/users" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800">
                                <People fontSize="small" />All Users</Link>
                        </div>
                        <div>
                            <h3 className="text-gray-400 mb-2">Orders</h3>
                            <Link to="/admin/orders" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800">
                                <ShoppingCart fontSize="small" />All Orders</Link>
                        </div>
                        <div>
                            <h3 className="text-gray-400 mb-2">Reviews</h3>
                            <Link to="/admin/reviews" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800">
                                <Star fontSize="small" />All Reviews</Link>
                        </div>
                    </nav>
                </aside>
                <main className="flex-1 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 shadow-lg">
                            <Inventory className="text-indigo-500 mb-3" />
                            <h3 className="text-gray-400 text-sm">Total Products</h3>
                            <p className="text-2xl font-semibold">{totalProducts}</p>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 shadow-lg">
                            <ShoppingCart className="text-indigo-500 mb-3" />
                            <h3 className="text-gray-400 text-sm">Total orders</h3>
                            <p className="text-2xl font-semibold">{totalOrders}</p>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 shadow-lg">
                            <Star className="text-indigo-500 mb-3" />
                            <h3 className="text-gray-400 text-sm">Total Reviews</h3>
                            <p className="text-2xl font-semibold">{totalReviews}</p>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 shadow-lg">
                            <AttachMoney className="text-indigo-500 mb-3" />
                            <h3 className="text-gray-400 text-sm">Total Revenue</h3>
                            <p className="text-2xl font-semibold">₹ {totalAmount}/-</p>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 shadow-lg">
                            <Error className="text-indigo-500 mb-3" />
                            <h3 className="text-gray-400 text-sm">Out of stock</h3>
                            <p className="text-2xl font-semibold">{outOfStock}</p>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 shadow-lg">
                            <CheckCircle className="text-indigo-500 mb-3" />
                            <h3 className="text-gray-400 text-sm">In stock</h3>
                            <p className="text-2xl font-semibold">{inStock}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 text-center hover:bg-gray-800 transition">
                            <Instagram className="text-indigo-500 text-4xl mb-3" />
                            <h3 className="font-medium">Instagram</h3>
                            <p className="text-sm text-gray-400">17K Followers</p>
                            <p className="text-sm text-gray-400">00 Posts</p>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 text-center hover:bg-gray-800 transition">
                            <YouTube className="text-indigo-500 text-4xl mb-3" />
                            <h3 className="font-medium">Youtube</h3>
                            <p className="text-sm text-gray-400">12M Followers</p>
                            <p className="text-sm text-gray-400">77 Posts</p>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 text-center hover:bg-gray-800 transition">
                            <Facebook className="text-indigo-500 text-4xl mb-3" />
                            <h3 className="font-medium">Facebook</h3>
                            <p className="text-sm text-gray-400">07K Followers</p>
                            <p className="text-sm text-gray-400">12 Posts</p>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 text-center hover:bg-gray-800 transition">
                            <LinkedIn className="text-indigo-500 text-4xl mb-3" />
                            <h3 className="font-medium">LinkedIn</h3>
                            <p className="text-sm text-gray-400">2417 Followers</p>
                            <p className="text-sm text-gray-400">07 Posts</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Dashboard