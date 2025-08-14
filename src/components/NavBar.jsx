import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import CartModal from "./CartModal";
import { useAuth } from '../hooks/useAuth';
import { logout } from '../Services/authService';
import MobileMenu from './MobileMenu';
import {
  Search,
  User,
  ShoppingCart,
  Phone,
  ChevronDown,
  Menu, 
  Heart,
} from "lucide-react";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Add this to track current route
  const { cartCount, cartItems, updateQuantity } = useCart();
  const { user, loading } = useAuth();
  const [animate, setAnimate] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleClick = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      window.scrollTo(0, 0);
      handleClick('/cakes');
    }
  };

  const handleCartClick = () => {
    setIsCartModalOpen(true);
  };

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false);
  };

  const handleExpandCart = () => {
    setIsCartModalOpen(false);
    navigate("/cart");
  };

  const handleRemoveItem = (id) => {
    updateQuantity(id, 0);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Function to check if a route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      name: "Cakes",
      hasDropdown: false,
      path: "/cakes",
    },
    {
      name: "Customize",
      hasDropdown: false,
      path: "/customize",
    },
    {
      name: "Contact Us",
      hasDropdown: false,
      path: "/contact-us",
    },
  ];

  useEffect(() => {
    if (cartCount > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [cartCount]);

  return (
    <>
      <nav className="bg-white font-parastoo py-6 relative shadow-sm sticky top-0 z-50 px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center w-full">
          {/* Logo - slightly moved to the right */}
          <button
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold hover:text-red-400 transition-colors duration-300 whitespace-nowrap flex-shrink-0 ml-5 ${
              isActiveRoute('/') ? 'text-red-400' : 'text-gray-600'
            }`}
            onClick={() => handleClick("/")}
          >
            <span className="transition-colors duration-300">Sweet</span>
            <span className="text-red-400 transition-colors duration-300">
              Spot
            </span>
          </button>

          {/* Desktop Navigation - centered between logo and actions */}
          <nav className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  className={`flex items-center space-x-1 text-lg transition-colors hover:text-red-400 py-2 px-2 ${
                    isActiveRoute(item.path) ? 'text-red-400' : 'text-gray-600'
                  }`}
                  onClick={() => !item.hasDropdown && handleClick(item.path)}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </button>

                {item.hasDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-200 z-50">
                    <div className="py-3">
                      {item.dropdownItems?.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => handleClick(dropdownItem.path)}
                          className={`block w-full text-left px-4 py-3 hover:bg-red-50 hover:text-red-400 transition-colors border-b border-gray-100 last:border-b-0 ${
                            isActiveRoute(dropdownItem.path) ? 'text-red-400 bg-red-50' : 'text-gray-600'
                          }`}
                        >
                          {dropdownItem.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side icons/actions - desktop only */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            {/* Search Input with Hover Effect */}
            <div className="relative group">
              <div className="flex items-center">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search cakes..."
                  className="w-48 opacity-0 group-hover:opacity-100 focus:opacity-100  transition-opacity duration-300 ease-in-out pl-4 pr-10 py-2 border border-transparent group-hover:border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-transparent bg-transparent group-hover:bg-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
                <button 
                  className="p-2 text-gray-600 hover:text-red-400 transition-colors group-hover:bg-white relative z-10 -ml-10"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            <button
              className={`p-2 transition-colors relative ${
                isActiveRoute('/cart') ? 'text-red-400' : 'text-gray-600 hover:text-red-400'
              }`}
              onClick={handleCartClick}
            >
              <ShoppingCart
                className={`h-5 w-5 transition-transform ${
                  animate ? "scale-125" : "scale-100"
                }`}
              />
              <span className="absolute -top-1 -right-1 bg-red-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Authentication Section */}
            {loading ? (
              <div className="p-2">
                <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
              </div>
            ) : user ? (
              // Profile Dropdown (when authenticated)
              <div className="relative group">
                <button className={`p-2 transition-colors ${
                  isActiveRoute('/profile') || isActiveRoute('/orders') || isActiveRoute('/wishlist') 
                    ? 'text-red-400' 
                    : 'text-gray-600 hover:text-red-400'
                }`}>
                  <User className="h-5 w-5" />
                </button>

                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-200 z-50">
                  <div className="py-3">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                      {user.email}
                    </div>
                    <button
                      onClick={() => handleClick("/profile")}
                      className={`block w-full text-left px-4 py-3 hover:bg-red-50 hover:text-red-400 transition-colors border-b border-gray-100 ${
                        isActiveRoute('/profile') ? 'text-red-400 bg-red-50' : 'text-gray-600'
                      }`}
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => handleClick("/orders")}
                      className={`block w-full text-left px-4 py-3 hover:bg-red-50 hover:text-red-400 transition-colors border-b border-gray-100 ${
                        isActiveRoute('/orders') ? 'text-red-400 bg-red-50' : 'text-gray-600'
                      }`}
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => handleClick("/wishlist")}
                      className={`block w-full text-left px-4 py-3 hover:bg-red-50 hover:text-red-400 transition-colors border-b border-gray-100 ${
                        isActiveRoute('/wishlist') ? 'text-red-400 bg-red-50' : 'text-gray-600'
                      }`}
                    >
                      Wishlist
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-400 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Login Button (when not authenticated)
              <button 
                onClick={() => handleClick('/login')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActiveRoute('/login') || isActiveRoute('/register')
                    ? 'bg-red-500 text-white'
                    : 'bg-red-400 text-white hover:bg-red-500'
                }`}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button - completely to the right */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-red-400 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <CartModal
        isOpen={isCartModalOpen}
        onClose={handleCloseCartModal}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={handleRemoveItem}
        onExpandCart={handleExpandCart}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        cartCount={cartCount}
        user={user}
        loading={loading}
        onNavigate={handleClick}
        onLogout={handleLogout}
        onCartClick={handleCartClick}
        animate={animate}
        currentPath={location.pathname} // Pass current path to MobileMenu
      />
    </>
  );
}

export default NavBar;