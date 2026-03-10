import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteReview,
  fetchAdminProducts,
  fetchProductReviews,
  removeErrors,
  removeSuccess,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function ReviewsList() {
  const { products, loading, error, reviews, success, message } = useSelector(
    (state) => state.admin,
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);
  const handleViewReviews = (productId) => {
    setSelectedProduct(productId);
    dispatch(fetchProductReviews(productId));
  };
  const handleDeleteReview = (productId, reviewId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this review?",
    );
    if (confirm) {
      dispatch(deleteReview({ productId, reviewId }));
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      dispatch(clearMessage());
      navigate("/admin/products");
    }
  }, [dispatch, error, success, message, navigate]);
  if (!products || products.length === 0) {
    return (
      <>
        <Navbar />
        <PageTitle title="All Products" />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-6 md:p-8">
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-200">
              All Reviews
            </h2>
            <p className="text-slate-400 mt-2">No reviews found</p>
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              Go back to Dasboard
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="All Reviews" />
          <div className="min-h-screen bg-gray-900 text-white mt-16 p-4 md:p-6">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              All Products
            </h1>
            <div className="hidden md:block overflow-x-auto bg-gray-900/50 border border-gray-700 rounded-xl mb-8">
              <table className="w-full text-sm">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Reviews</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product._id}
                      className="border-t border-gray-700 hover:bg-gray-800"
                    >
                      <td className="p-3 text-white">{index + 1}</td>
                      <td className="p-3 text-white">{product.name}</td>
                      <td className="p-3">
                        <img
                          src={product.image[0]?.url}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                        />
                      </td>
                      <td className="p-3 text-white">{product.numOfReviews}</td>
                      <td className="p-3">
                        {product.numOfReviews > 0 && (
                          <button
                            className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm"
                            onClick={() => handleViewReviews(product._id)}
                          >
                            View Reviews
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-4 mb-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-900/50 border border-gray-700 rounded-xl p-4"
                >
                  <div className="flex gap-3 mb-2">
                    <img
                      src={product.image[0]?.url}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-700"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-400">
                        Reviews: {product.numOfReviews}
                      </p>
                    </div>
                  </div>
                  {product.numOfReviews > 0 && (
                    <button
                      onClick={() => handleViewReviews(product._id)}
                      className="w-full mt-2 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm"
                    >
                      View Reviews
                    </button>
                  )}
                </div>
              ))}
            </div>
            {selectedProduct && reviews && reviews.length > 0 && (
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5">
                <h2 className="text-xl font-semibold mb-4">
                  Reviews for Product
                </h2>
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-800 text-gray-300">
                      <tr>
                        <th className="p-3 text-left">#</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Rating</th>
                        <th className="p-3 text-left">Comment</th>
                        <th className="p-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((review, index) => (
                        <tr
                          key={review._id}
                          className="border-t border-gray-700 hover:bg-gray-800"
                        >
                          <td className="p-3">{index + 1}</td>
                          <td className="p-3">{review.name}</td>
                          <td className="p-3">{review.rating}</td>
                          <td className="p-3 text-gray-400">
                            {review.comment}
                          </td>
                          <td className="p-3">
                            <button
                              className="p-2 rounded-lg bg-red-600 hover:bg-red-700"
                              onClick={() =>
                                handleDeleteReview(selectedProduct, review._id)
                              }
                            >
                              <Delete fontSize="small" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="md:hidden space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-gray-700 rounded-lg p-4"
                >
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">{review.name}</p>
                    <span className="text-sm text-gray-400">
                      ⭐ {review.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{review.comment}</p>
                  <button
                    onClick={() =>
                      handleDeleteReview(selectedProduct, review._id)
                    }
                    className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700"
                  >
                    Delete Review
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ReviewsList;
