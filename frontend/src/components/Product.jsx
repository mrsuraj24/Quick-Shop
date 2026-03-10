import { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product({ product }) {
  const [rating, setRating] = useState(0);
  const handleRatingChange = (newRating) => {
    setRating(newRating)
    console.log(`Rating changed to: ${newRating}`);
  }
  return (
    <Link to={`/product/${product._id}`} className="block text-inherit no-underline">
      <div className="w-full max-w-[260px] rounded-2xl overflow-hidden bg-gray-900/60 border border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex flex-col">
        <div className="w-full h-50 flex items-center justify-center bg-gray-800">
          <img src={product.image[0]?.url} alt={product.name} className="max-h-44 object-contain transition-transform duration-300 hover:scale-105" />
        </div>
        <div className="p-4 flex flex-col gap-1 text-center">
          <h3 className="text-base font-semibold text-white line-clamp-1">
            {product.name}
          </h3>
          <p className="text-indigo-400 font-medium">
            <strong>Price: </strong>₹ {product.price}/-
          </p>
          <div className="flex items-center justify-center gap-1">
            <Rating value={product.ratings} onRatingChange={handleRatingChange} disabled />
          </div>
          <span className="text-xs text-gray-400">
            ({product.numOfReviews} {product.numOfReviews > 1 ? "Reviews" : "Review"})
          </span>
          <button className="mt-3 h-12 w-full mx-auto px-6 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition shadow-md active:scale-95 ">
            See Details
          </button>
        </div>
      </div>
    </Link>
  )
}

export default Product;