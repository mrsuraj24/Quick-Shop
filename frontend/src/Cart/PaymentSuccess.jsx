import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrder, removeErrors, removeSuccess } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';
import Loader from '../components/Loader';

function PaymentSuccess() {
    const [searchParams] = useSearchParams()
    const reference = searchParams.get('reference')
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { loading, success, error } = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        const createOrderData = async () => {
            try {
                const orderItem = JSON.parse(sessionStorage.getItem('orderItem'))
                if (!orderItem) return;
                const orderData = {
                    shippingInfo: {
                        address: shippingInfo.address,
                        city: shippingInfo.city,
                        state: shippingInfo.state,
                        country: shippingInfo.country,
                        pincode: shippingInfo.pincode,
                        phoneNo: shippingInfo.phoneNumber
                    },
                    orderItems: cartItems.map((item) => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
                        product: item.product,
                    })),
                    paymentInfo: {
                        id: reference,
                        status: 'succeeded'
                    },
                    itemPrice: orderItem.subtotal,
                    taxPrice: orderItem.tax,
                    shippingPrice: orderItem.shippingCharges,
                    totalPrice: orderItem.total,
                }
                console.log('Sending Data', orderData)
                dispatch(createOrder(orderData))
                sessionStorage.removeItem('orderItem')
            } catch (error) {
                console.log('Order creation error', error.message);
                toast.error(error.message || 'Order creation error', { position: 'top-center', autoClose: 3000 })
            }
        }
        createOrderData()
    }, [])
    useEffect(() => {
        if (success) {
            toast.success("Order Placed", { position: 'top-center', autoClose: 3000 });
            dispatch(clearCart())
            dispatch(removeSuccess())
        }
    }, [dispatch, success])
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    return (
        <>
            {loading ? (<Loader />) : (<>
                <Navbar />
                <PageTitle title='Payment Status' />
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/90 text-white px-4">
                    <div className="w-full max-w-sm rounded-xl bg-gray-900/50 p-6 shadow-2xl text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">
                            Order Confirmed!
                        </h1>
                        <p className="text-gray-400 text-sm mb-4">
                            Your payment was successful. Thanks for shopping with us.
                        </p>
                        <p className="text-sm text-gray-300 mb-6">
                            Reference ID:
                            <span className="ml-1 font-semibold text-white">{reference}</span>
                        </p>
                        <div className="space-y-3">
                            <Link className="block w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium" to='/'>
                                Explore more products
                            </Link>
                            <Link className="block w-full py-2 rounded-xl border border-gray-700 text-white hover:bg-gray-700 transition" to='/orders/user'>
                                View Orders
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>)}
        </>
    )
}

export default PaymentSuccess