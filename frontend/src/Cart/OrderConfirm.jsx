import PageTitle from '../components/PageTitle';
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useSelector } from 'react-redux';
import CheckoutPath from './CheckoutPath';
import { useNavigate } from 'react-router-dom';

function OrderConfirm() {
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user)
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = Math.round(subtotal * 0.18)
    const shippingCharges = subtotal > 5000 ? 0 : 50
    const total = (subtotal + tax + shippingCharges).toFixed(2);
    const navigate = useNavigate();
    const proceedToPayment = () => {
        const data = {
            subtotal,
            tax,
            shippingCharges,
            total
        }
        sessionStorage.setItem('orderItem', JSON.stringify(data));
        navigate('/process/payment')
    }
    return (
        <>
            <Navbar />
            <PageTitle title="Order Confirm" />
            <CheckoutPath activePath={1} />
            <div className="min-h-screen bg-gray-900/90 text-white px-4 py-10 flex justify-center">
                <div className="w-full max-w-6xl rounded-xl bg-gray-900/50 p-6 sm:p-8 shadow-2xl">
                    <h1 className="text-3xl font-bold text-center mb-8">
                        Order Confirmation
                    </h1>
                    <div className="space-y-8">
                        <div className="rounded-xl border border-gray-700 p-4">
                            <h2 className="text-lg font-semibold mb-4 text-indigo-400">
                                Shipping Details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-400">Name</p>
                                    <p className="font-medium">{user.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Phone</p>
                                    <p className="font-medium">{shippingInfo.phoneNumber}</p>
                                </div>
                                <div className="sm:col-span-3">
                                    <p className="text-gray-400">Address</p>
                                    <p className="font-medium">
                                        {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}-{shippingInfo.pincode}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl border border-gray-700 p-4">
                            <h2 className="text-lg font-semibold mb-4 text-indigo-400">
                                Cart Items
                            </h2>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.product} className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center bg-gray-800/40 p-3 rounded-lg">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-gray-700" />
                                        <div className="sm:col-span-2">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-400">
                                                Price: ₹ {item.price}/-
                                            </p>
                                        </div>
                                        <p className="text-sm text-center">
                                            Qty: {item.quantity}
                                        </p>
                                        <p className="text-right font-semibold">
                                            ₹ {item.quantity * item.price}/-
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl border border-gray-700 p-4">
                            <h2 className="text-lg font-semibold mb-4 text-indigo-400">
                                Order Summary
                            </h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span>₹ {subtotal}/-</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Shipping</span>
                                    <span>₹ {shippingCharges}/-</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">GST</span>
                                    <span>₹ {tax}/-</span>
                                </div>
                                <div className="border-t border-gray-700 pt-3 flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>₹ {total}/-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="mt-8 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium" onClick={proceedToPayment} >
                        Proceed to Payment
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default OrderConfirm