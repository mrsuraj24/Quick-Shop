import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createReview, getProductDetails, removeErrors, removeSuccess } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { addItemsToCart, removeMessage } from '../features/cart/cartSlice';

function ProductDetails() {
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState("")
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleRatingChange = (newRating) => {
        setUserRating(newRating)
    }
    const { loading, error, product, reviewSuccess, reviewLoading } = useSelector((state) => state.product);

    const { loading: cartLoading, error: cartError, success, message, cartItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const checkoutHandler = () => {
        navigate(`/login?redirect=/shipping`)
    }
    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id));
        }
        return () => {
            dispatch(removeErrors())
        }
    }, [dispatch, id])
    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
        if (cartError) {
            toast.error(cartError, { position: 'top-center', autoClose: 3000 });
        }
    }, [dispatch, error, cartError])
    useEffect(() => {
        if (success) {
            toast.success(message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeMessage())
        }
    }, [dispatch, success, message])
    const decreaseQuantity = () => {
        if (quantity <= 1) {
            toast.error('Quantity can not be less than 1', { position: 'top-center', autoClose: 3000 })

            return;
        }
        setQuantity(qty => qty - 1)
    }
    const increaseQuantity = () => {
        if (product.stock <= quantity) {
            toast.error('Cannot exceed available Stock!', { position: 'top-center', autoClose: 3000 })

            return;
        }
        setQuantity(qty => qty + 1)
    }
    const addToCart = () => {
        dispatch(addItemsToCart({ id, quantity }))
    }
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!userRating) {
            toast.error("Please select a rating", { position: 'top-center', autoClose: 3000 })
            return
        }
        dispatch(createReview({
            rating: userRating,
            comment,
            productId: id
        }))
    }
    useEffect(() => {
        if (reviewSuccess) {
            toast.success("Review submitted successfully", { position: 'top-center', autoClose: 3000 })
            setUserRating(0);
            setComment("");
            dispatch(removeSuccess())
            dispatch(getProductDetails(id))
        }
    }, [reviewSuccess, id, dispatch])
    useEffect(() => {
        if (product && product.image && product.image.length > 0) {
            setSelectedImage(product.image[0].url)
        }
    }, [product])
    if (loading) {
        return (
            <>
                <Navbar />
                <Loader />
                <Footer />
            </>
        )
    }
    if (error || !product) {
        return (
            <>
                <PageTitle title="Product Details" />
                <Navbar />
                <Footer />
            </>
        )
    }
    return (
        <>
            <Navbar />
            <PageTitle title={`${product.name}`} />
            <div className="min-h-screen bg-gray-900/90 text-white px-4 mt-16 py-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-gray-900/50 rounded-xl shadow-2xl border border-gray-700 p-6 flex items-center justify-center">
                        {/* src= { product.images[0].url.replace('./', '/')} */}
                        <img src={selectedImage} alt={product.name} className="max-h-[400px] object-contain rounded-lg" />
                        {product.image.length > 1 && (
                            <div className="product-thumbnails">
                                {product.image.map((img, index) => (
                                    <img src={img.url} alt={`Thumbnail ${index + 1}`} className='thumbnail-image' onClick={() => setSelectedImage(img.url)} />
                                ))}
                            </div>)}
                    </div>
                    <div className="bg-gray-900/50 rounded-xl shadow-2xl border border-gray-700 p-6 space-y-4">
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
                        <p className="text-xl font-semibold text-indigo-400">
                            ₹{product.price}
                        </p>
                        <div className="flex items-center gap-2">
                            <Rating value={product.ratings} disabled={true} />
                            <span className="text-sm text-gray-400">({product.numOfReviews} {product.numOfReviews > 1 ? "Reviews" : "Review"})</span>
                        </div>
                        <p className={`text-sm font-medium ${product.stock > 0 ? "text-green-400" : "text-red-500"}`}>
                            {product.stock > 0 ? `In Stock (${product.stock} available)` : `Out of Stock`}
                        </p>
                        {product.stock > 0 && (<>
                            <div className="flex items-center gap-4 mt-4">
                                <span className="text-sm text-gray-400">Quantity</span>
                                <div className="flex items-center gap-2">
                                    <button className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600" onClick={decreaseQuantity}>-</button>
                                    <input type="text" value={quantity} className="w-12 text-center bg-transparent border border-gray-700 rounded-lg" readOnly />
                                    <button className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600" onClick={increaseQuantity} >+</button>
                                </div>
                            </div>
                            <button className="mt-4 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium disabled:opacity-60" onClick={addToCart} disabled={cartLoading} >
                                {cartLoading ? 'Adding...' : 'Add to Cart'}
                            </button>
                            <button className="mt-6 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium" onClick={checkoutHandler} >
                                Proceed to Checkout
                            </button>
                        </>)}
                        <form className="mt-6 border-t border-gray-700 pt-6 space-y-3" onSubmit={handleReviewSubmit}>
                            <h3 className="font-semibold text-lg">Write a Review</h3>
                            <Rating value={userRating} disabled={false} onRatingChange={handleRatingChange} />
                            <textarea className="w-full min-h-[100px] rounded-xl bg-gray-800 border border-gray-700 p-3 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500" required placeholder="Write your review here..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                            <button className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition" disabled={reviewLoading} >{reviewLoading ? "Submitting..." : "Submit Review"}</button>
                        </form>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-12 bg-gray-900/50 rounded-xl shadow-2xl border border-gray-700 p-6">
                    <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="space-y-4">
                            {product.reviews.map((reviews, index) => (
                                <div className="border border-gray-700 rounded-xl p-4 bg-gray-800/40" key={index}>
                                    <Rating value={reviews.rating} disabled={true} />
                                    <p className="text-sm text-gray-300 mt-2">{reviews.comment}</p>
                                    <p className="text-xs text-gray-500 mt-1">By:- {reviews.name}</p>
                                </div>
                            ))}
                        </div>) : (
                        <p className="text-gray-400 text-sm">
                            No review yet. Be the first to review this product.
                        </p>
                    )}
                </div>
            </div >
            <Footer />
        </>
    )
}

export default ProductDetails