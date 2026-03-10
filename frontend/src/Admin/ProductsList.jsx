import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader.jsx";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteProduct,
  fetchAdminProducts,
  removeErrors,
  removeSuccess,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function ProductsList() {
  const navigate = useNavigate();
  const { products, loading, error, deleting } = useSelector(
    (state) => state.admin,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);
  const handleDelete = (productId) => {
    const isConfirmed = window.confirm(
      "Are you sure! You want to delete this product?",
    );
    if (isConfirmed) {
      dispatch(deleteProduct(productId)).then((action) => {
        if (action.type === "admin/deleteProduct/fulfilled") {
          toast.success("Product deleted successfully", {
            position: "top-center",
            autoClose: 3000,
          });
          dispatch(removeSuccess());
        }
      });
    }
  };
  if (loading) {
    return <Loader />;
  }
  if (!products || products.length === 0) {
    return (
      <>
        <Navbar />
        <PageTitle title="All Products" />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-6 md:p-8">
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-200">
              Admin Products
            </h2>
            <p className="text-slate-400 mt-2">No products found</p>
            <button
              onClick={() => navigate("/admin/product/create")}
              className="mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              + Add Product
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
          <PageTitle title="All Products" />
          <div className="min-h-screen bg-gray-900 text-white mt-16 p-4 md:p-6">
            <h1 className="text-2xl font-semibold mb-6 text-center">
              All Products
            </h1>
            <div className="hidden md:block overflow-x-auto bg-gray-900/50 border border-gray-700 rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Rating</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Stock</th>
                    <th className="p-3 text-left">Created</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product._id}
                      className="border-t border-gray-700 hover:bg-gray-800"
                    >
                      <td className="p-3 text-gray-200">{index + 1}</td>
                      <td className="p-3 text-gray-200">
                        <img
                          src={product.image[0]?.url}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                        />
                      </td>
                      <td className="p-3 text-gray-200">{product.name}</td>
                      <td className="p-3 text-gray-200">₹ {product.price}/-</td>
                      <td className="p-3 text-gray-200">{product.ratings}</td>
                      <td className="p-3 text-gray-200 capitalize">
                        {product.category}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${product.stock > 0 ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-3 text-gray-400">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 flex gap-2">
                        <Link
                          to={`/admin/product/${product._id}`}
                          className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
                        >
                          <Edit fontSize="small" />
                        </Link>
                        <button
                          className="p-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50"
                          onClick={() => handleDelete(product._id)}
                          disabled={deleting[product._id]}
                        >
                          {deleting[product._id] ? (
                            <Loader />
                          ) : (
                            <Delete fontSize="small" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-900/50 border border-gray-700 rounded-xl p-4"
                >
                  <div className="flex gap-3 mb-3">
                    <img
                      src={product.image[0]?.url}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-700"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-400">
                        ₹ {product.price} • {product.category}
                      </p>
                      <p className="text-xs text-gray-400">
                        Rating: {product.ratings}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${product.stock > 0 ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"}`}
                    >
                      Stock: {product.stock}
                    </span>
                    <span className="text-gray-400">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      to={`/admin/product/${product._id}`}
                      className="flex-1 text-center py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      disabled={deleting[product._id]}
                      className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50"
                    >
                      {deleting[product._id] ? "Deleting..." : "Delete"}
                    </button>
                  </div>
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

export default ProductsList;
