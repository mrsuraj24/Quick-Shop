import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { getProduct } from "../features/products/productSlice";
import Loader from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeErrors } from "../features/products/productSlice";
import NoProducts from "../components/NoProducts";
import Pagination from "../components/Pagination";

function Products() {
  const { loading, error, products, resultPerPage, productCount } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const pageFromURL = parseInt(searchParams.get("page"), 10) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const navigate = useNavigate();
  const categories = [
    "Electronics",
    "Mobile phones",
    "Laptops and computers",
    "Tablets",
    "Smart watches",
    "Fashion",
    "Men clothing",
    "Women clothing",
    "Kids wear",
    "Bags and wallets",
    "Home and Kitchen",
    "Furniture",
    "Beauty and Personal Care",
    "Sports and Fitness",
    "Books and Stationery",
    "Toys and Games",
    "Automotive",
    "Health and Wellness",
    "Industrial and Tools",
    "Digital Products",
  ];
  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }));
  }, [dispatch, keyword, currentPage, category]);
  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);
  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const newSearchParams = new URLSearchParams(location.search);
      if (page === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", page);
      }
      navigate(`?${newSearchParams.toString()}`);
    }
  };
  const handleCategoryClick = (category) => {
    setCurrentPage(1);
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("category", category);
    newSearchParams.delete("page");
    navigate(`?${newSearchParams.toString()}`);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="All Products" />
          <div className="min-h-screen bg-gray-900/90 text-white pt-24 pb-10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-64 shrink-0">
                  <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 lg:sticky lg:top-28">
                    <h3 className="text-lg font-semibold mb-4 text-indigo-400">
                      Categories
                    </h3>
                    {/* Render catagories */}
                    <ul className="space-y-2">
                      {categories.map((category) => {
                        return (
                          <li
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className="cursor-pointer px-3 py-2 rounded-lg text-sm uppercase text-gray-300 hover:bg-gray-800 hover:text-indigo-400 transition"
                          >
                            {category}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </aside>
                <main className="flex-1">
                  {Array.isArray(products) && products.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                      {products.map((product) => (
                        <Product key={product._id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <NoProducts keyword={keyword} />
                  )}
                  {productCount > resultPerPage && (
                    <div className="mt-12 flex justify-center">
                      <Pagination
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </main>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Products;
