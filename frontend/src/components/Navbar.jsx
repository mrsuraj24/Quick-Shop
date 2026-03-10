import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/products`);
    }
    setSearchQuery("");
    setShowSearch(false);
  };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="text-lg font-bold text-white tracking-wide">
          Quick<span className="text-indigo-500">Shop</span>
        </NavLink>
        {/* Search (Desktop) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 mx-6 max-w-xl"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 text-white px-4 py-2 rounded-l-xl outline-none border border-gray-800 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-xl text-white"
          >
            <SearchIcon />
          </button>
        </form>
        {/* Mobile Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-300 md:hidden hover:text-white"
          >
            <SearchIcon />
          </button>
          <div className="px-4 py-4 space-y-4">
            <div className="flex gap-6 pt-2">
                            <NavLink to="/chatbot" >
                  <SmartToyIcon className="text-gray-300 hover:text-white" />
                </NavLink>
              {isAuthenticated && (
                <NavLink
                  to="/wishlist"
                  className="text-gray-300 hover:text-white transition"
                  title="Wishlist"
                >
                  <FavoriteBorderIcon />
                </NavLink>
              )}
              {isAuthenticated && (
                <NavLink to="/cart" className="relative mr-15">
                  {cartItems?.length > 0 && (
                    <span className="absolute -top-2 -right-3 w-5 h-5 text-xs bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                  <ShoppingCartIcon className="text-gray-300 hover:text-white transition" />
                </NavLink>
              )}
              {!isAuthenticated && (
                <NavLink
                  to="/login"
                  className="text-gray-300 hover:text-white transition"
                  title="Login"
                >
                  <PersonIcon />
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="sm:hidden px-4 pb-3 bg-gray-950 border-b border-gray-800">
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-l-xl outline-none border border-gray-800 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-xl text-white"
            >
              <SearchIcon />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
