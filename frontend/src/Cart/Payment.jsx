import PageTitle from '../components/PageTitle';
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import CheckoutPath from './CheckoutPath';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Payment() {
    const orderItem = JSON.parse(sessionStorage.getItem('orderItem'))
    const { user } = useSelector(state => state.user)
    const { shippingInfo } = useSelector(state => state.cart)
    const navigate = useNavigate();
    const completePayment = async (amount) => {
        try {
            const { data: keyData } = await axios.get('/api/v1/getKey');
            const { key } = keyData;
            const { data: orderData } = await axios.post('/api/v1/payment/process', { amount });
            const { order } = orderData
            // Open Razorpay Checkout
            const options = {
                key,
                amount,
                currency: 'INR',
                name: 'QuickShop',
                description: 'E-Commerce Website Payment Transaction',
                order_id: order.id,
                handler: async function (response) {
                    const { data } = await axios.post('/api/v1/paymentVerification', {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature
                    })
                    if (data.success) {
                        navigate(`/paymentSuccess?reference=${data.reference}`)
                    } else {
                        alert('Payment Verification Failed')
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: shippingInfo.phoneNumber
                },
                theme: {
                    color: 'rgb(9, 66, 172)'
                },
            };
            const rzp = new Razorpay(options);
            rzp.open();
        } catch (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
        }
    }
    return (
        <>
            <Navbar />
            <PageTitle title="Payment Process" />
            <CheckoutPath activePath={2} />
            <div className="min-h-screen bg-gray-900/90 flex items-center justify-center px-4 text-white">
                <div className="w-full max-w-md rounded-xl bg-gray-900/50 p-6 shadow-2xl text-center">
                    <Link to="/order/confirm" className="inline-block mb-6 text-sm text-gray-400 hover:text-indigo-400 transition">
                        ← Go Back
                    </Link>
                    <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium text-lg" onClick={() => completePayment(orderItem.total)}>
                        Pay (₹ {orderItem.total}/-)
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Payment