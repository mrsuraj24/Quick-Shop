import { useEffect } from 'react';
import ImageSlider from "../components/ImageSlider.jsx"
import Product from '../components/Product.jsx';
import PageTitle from '../components/PageTitle.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from "../components/Footer"
import Loader from '../components/Loader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, removeErrors } from '../features/products/productSlice.js';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const { loading, error, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProduct({ keyword: '' }))
  }, [dispatch])
  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors())
    }
  }, [dispatch, error])
  return (
    <>
      {loading ? (<Loader />) : (
        <>
          <Navbar />
          <PageTitle title="QuickShop" />
          <ImageSlider />
          <div className="min-h-screen relative overflow-hidden bg-gray-900 text-white mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-3 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),_transparent_gray-800 border border-gray-700">
            <div className="max-w-7xl text-center relative z-10">
              <div className='flex flex-col items-center'>
                <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gray-800 border border-gray-700 shadow text-indigo-400 text-sm font-medium">
                  ✨ Welcome to the future of shopping
                </span>
                <span className="inline-block mb-4 px-4 py-2 rounded-full bg-gray-800 border border-gray-700 shadow text-indigo-400 text-sm font-medium">
                  ✨ Smart Shopping Starts Here
                </span>
              </div>
              <h1 className="text-2xl md:text-5xl font-extrabold text-white m-4">
                Welcome to <span className="text-indigo-500">ShopEasy</span>
              </h1>
              <p className="text-gray-400 text-lg mb-10 delay-100">
                Premium products, seamless experience, and modern design crafted for you.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => navigate("/products")} className="px-7 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/30 transition">
                  Shop Now →
                </button>
                <button onClick={() => navigate("/products")} className="px-7 py-3 rounded-full bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 hover:shadow-indigo-500/30 transition">
                  View Categories
                </button>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-4xl font-extrabold text-center text-white my-3">
                Featured Products
              </h2>
              <p className="text-center text-gray-400 mb-14 max-w-xl mx-auto">
                Hand-picked products just for you. Quality, value, and style in one place.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="rounded-2xl p-7 bg-gray-900/60 border border-gray-800 shadow-lg hover:shadow-indigo-xl transition-all duration-300 hover:-translate-y-2" >
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
            <div className="max-w-7xl mx-auto sm:px-6 text-center px-5 mt-10">
              <h2 className="text-4xl md:text-4xl sm:text-4xl font-extrabold text-white mb-4">
                Why Shop With <span className="text-indigo-500">ShopEasy</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto mb-16">
                We focus on speed, security, and satisfaction to give you a smooth shopping journey.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="p-8 rounded-2xl bg-gray-900/60 border border-gray-800 shadow-lg hover:shadow-indigo-500/20 transition hover:-translate-y-2">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-indigo-600 text-white">
                    ⚡
                  </div>
                  <h3 className="text-xl text-white font-semibold mb-3">Fast Performance</h3>
                  <p className="text-gray-400 text-sm">
                    Optimized performance for smooth browsing and quick checkout.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-gray-900/60 border border-gray-800 shadow-lg hover:shadow-indigo-500/20 transition hover:-translate-y-2">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-purple-600 text-white">
                    🔒
                  </div>
                  <h3 className="text-xl text-white font-semibold mb-3">Secure Payments</h3>
                  <p className="text-gray-400 text-sm">
                    Your data and payments are always protected.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-gray-900/60 border border-gray-800 shadow-lg hover:shadow-indigo-500/20 transition hover:-translate-y-2">
                  <div className="w-12 h-12 mx-auto mb-5 flex items-center justify-center rounded-xl bg-pink-600 text-white">
                    🚚
                  </div>
                  <h3 className="text-lg text-white font-semibold mb-2">Quick Delivery</h3>
                  <p className="text-gray-400 text-sm">
                    Reliable delivery partners to reach you faster.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-gray-900/60 border border-gray-800 shadow-lg hover:shadow-indigo-500/20 transition hover:-translate-y-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-pink-600 text-white mb-5 mx-auto">
                    📈
                  </div>
                  <h3 className="text-xl text-white font-semibold mb-3">Scalable Platform</h3>
                  <p className="text-gray-400">
                    Built to grow with your needs and future features.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>)
      }
    </>
  )
}
export default Home