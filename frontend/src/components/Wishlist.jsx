// import { useSelector } from "react-redux";
import { Favorite, Delete, ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Wishlist() {

  //   const dispatch = useDispatch();
  //   const { wishlist } = useSelector((state) => state.wishlist);

  //   const totalWishlist = wishlist?.length || 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#020617] text-gray-200 p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Favorite className="text-red-500" />
            <h1 className="text-2xl font-semibold">
              My Wishlist  {/* ({totalWishlist}) */}
            </h1>
          </div>

          <Link
            to="/products"
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Empty Wishlist */}
        {/* {totalWishlist === 0 ? ( */}
        <div className="flex flex-col items-center justify-center mt-32 text-gray-400">

          <Favorite style={{ fontSize: 60 }} className="text-gray-600 mb-4" />

          <p className="text-lg mb-2">Your wishlist is empty</p>

          <Link
            to="/products"
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
          >
            Browse Products
          </Link>

        </div>
        {/* ) : ( */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* {wishlist.map((product) => ( */}

          <div
            //   key={product._id}
            className="bg-[#111827] border border-[#1f2937] rounded-xl p-4 hover:scale-105 transition duration-300"
          >

            {/* Image */}
            <img
              // src={product.images[0].url}
              // alt={product.name}
              className="h-48 w-full object-cover rounded-lg mb-4"
            />

            {/* Product Name */}
            <h3 className="font-medium text-lg mb-1 line-clamp-1">
              {/* {product.name} */}
            </h3>

            {/* Price */}
            <p className="text-indigo-400 font-semibold mb-3">
              {/* ₹ {product.price} */}
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-between">

              <button
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg text-sm"
              >
                <ShoppingCart fontSize="small" />
                Add to Cart
              </button>

              <button
                className="text-red-400 hover:text-red-500"
              >
                <Delete />
              </button>

            </div>

          </div>

          {/* ))} */}

        </div>
        {/* )} */}
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;