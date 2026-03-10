import PageTitle from '../components/PageTitle';
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
    const { cartItems } = useSelector(state => state.cart)
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = Math.round(subtotal * 0.18)
    const shippingCharges = subtotal > 5000 ? 0 : 50
    const total = subtotal + tax + shippingCharges
    const navigate = useNavigate();
    const checkoutHandler = () => {
        navigate(`/login?redirect=/shipping`)
    }
    return (
        <>
            <Navbar />
            <PageTitle title="My Cart" />
            <div className="min-h-screen bg-gray-900/90 text-white px-4 mt-16 py-10">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20">
                        <p className="text-2xl font-semibold mb-4">🛒 Your cart is Empty</p>
                        <Link to="/products" className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
                        <div className="lg:col-span-2 rounded-xl bg-gray-900/50 p-6 shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6">My Cart</h2>
                            <div className="hidden sm:grid grid-cols-5 gap-4 text-gray-300 text-sm border-b border-gray-700 pb-3 mb-4">
                                <span className="col-span-2">Product</span>
                                <span className="text-center">Quantity</span>
                                <span className="text-right">Item Total</span>
                                <span className="text-right">Actions</span>
                            </div>
                            <div className="space-y-4">
                                {cartItems && cartItems?.map(item => <CartItem item={item} key={item.name} />)}
                            </div>
                        </div>
                        <div className="rounded-xl bg-gray-900/50 p-6 shadow-2xl h-fit">
                            <h3 className="text-xl font-semibold mb-6 text-center">Price Summary</h3>
                            <div className="space-y-3 text-sm text-gray-300">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹ {subtotal}/-</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (18%)</span>
                                    <span>₹ {tax.toFixed(2)}/-</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>₹ {shippingCharges}/-</span>
                                </div>
                                <div className="border-t border-gray-700 pt-4 flex justify-between text-lg font-bold text-white">
                                    <span>Total</span>
                                    <span>₹ {total.toFixed(2)}/-</span>
                                </div>
                            </div>
                            <button className="mt-6 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium" onClick={checkoutHandler} >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Cart