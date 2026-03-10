import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { addItemsToCart, removeErrors, removeItemFromCart, removeMessage } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

function CartItem({ item }) {
    const { success, loading, error, message, cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(item.quantity)
    const decreaseQuantity = () => {
        if (quantity <= 1) {
            toast.error('Quantity can not be less than 1', { position: 'top-center', autoClose: 3000 })
            dispatch(removeErrors())
            return;
        }
        setQuantity(qty => qty - 1)
    }
    const increaseQuantity = () => {
        if (item.stock <= quantity) {
            toast.error('Cannot exceed available Stock!', { position: 'top-center', autoClose: 3000 })
            dispatch(removeErrors())
            return;
        }
        setQuantity(qty => qty + 1)
    }
    const handleUpdate = () => {
        if (loading) return;
        if (quantity !== item.quantity) {
            dispatch(addItemsToCart({ id: item.product, quantity }))
        }
    }
    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    useEffect(() => {
        if (success) {
            toast.success(message, { position: 'top-center', autoClose: 3000, toastId: 'cart-update' });
            dispatch(removeMessage())
        }
    }, [dispatch, success, message])
    const handleRemove = () => {
        if (loading) return;
        dispatch(removeItemFromCart(item.product))
        toast.success("Item remove from the cart successfully", { position: 'top-center', autoClose: 3000 });
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center rounded-xl bg-gray-800/40 p-4 border border-gray-700">
            <div className="col-span-2 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-gray-700" />
                <div className="item-details">
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-gray-400 my-2"><strong>Price: ₹ </strong>{(item.price).toFixed(2)}/-</p>
                    <p className="text-sm text-gray-400"><strong>Quantity: </strong>{item.quantity}</p>
                </div>
            </div>
            <div className="flex justify-center text-center sm:justify-center items-center gap-2">
                <button className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50" onClick={decreaseQuantity} disabled={loading}>-</button>
                <input type="number" value={quantity} className="w-12 text-center bg-transparent border border-gray-700 rounded-lg text-white" readOnly min="1" />
                <button className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50" onClick={increaseQuantity} disabled={loading}>+</button>
            </div>
            <div className="text-center sm:text-right font-semibold text-white">
                <div>₹ {(item.price * item.quantity).toFixed(2)}/-</div>
            </div>
            <div className="flex sm:flex-col gap-2 justify-end">
                <button className="px-3 py-1 rounded-lg text-sm bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50" onClick={handleUpdate} disabled={loading || quantity === item.quantity} >
                    {loading ? 'Updating...' : 'Update'}
                </button>
                <button className="px-3 py-1 rounded-lg text-sm border border-red-500 text-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50" disabled={loading} onClick={handleRemove} >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartItem