import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  ShoppingCart,
  ChefHat,
  Cake,
  User,
  Heart,
  ChevronDown,
  ChevronRight,
  Phone,
  Home,
  Palette
} from 'lucide-react';

function MobileMenu({ 
  isOpen, 
  onClose, 
  cartCount, 
  user, 
  loading, 
  onNavigate, 
  onLogout,
  onCartClick,
  animate,
  currentPath // Add currentPath prop
}) {
  const [searchText, setSearchText] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

  const handleClick = (path) => {
    onNavigate(path);
    onClose();
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      onNavigate('/cakes');
      onClose();
    }
  };

  const handleLogout = async () => {
    try {
      await onLogout();
      onNavigate('/');
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Function to check if a route is active
  const isActiveRoute = (path) => {
    return currentPath === path;
  };

  const menuItems = [
    {
      name: "Cakes",
      hasDropdown: false,
      path: "/cakes",
      icon: <Cake className="h-5 w-5" />,
    },
    {
      name: "Customize",
      hasDropdown: false,
      path: "/customize",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      name: "Contact Us",
      hasDropdown: false,
      path: "/contact-us",
      icon: <Phone className="h-5 w-5" />,
    },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <button
              className={`text-2xl font-bold transition-colors ${
                isActiveRoute('/') ? 'text-red-400' : 'text-gray-600'
              }`}
              onClick={() => handleClick("/")}
            >
              <span>Sweet</span>
              <span className="text-red-400">Spot</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-red-400 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search cakes..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-red-400 transition-colors"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto">
            <div className="py-4">
              {/* Home */}
              <button
                onClick={() => handleClick('/')}
                className={`flex items-center justify-between w-full px-6 py-4 text-left transition-colors ${
                  isActiveRoute('/') 
                    ? 'bg-red-50 text-red-400' 
                    : 'text-gray-600 hover:bg-red-50 hover:text-red-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Home className="h-5 w-5" />
                  <span className="text-lg">Home</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Menu Items */}
              {menuItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => item.hasDropdown ? toggleSection(item.name) : handleClick(item.path)}
                    className={`flex items-center justify-between w-full px-6 py-4 text-left transition-colors ${
                      isActiveRoute(item.path) 
                        ? 'bg-red-50 text-red-400' 
                        : 'text-gray-600 hover:bg-red-50 hover:text-red-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {item.hasDropdown ? (
                        <ChevronDown className={`h-5 w-5 transition-transform ${expandedSection === item.name ? 'rotate-180' : ''}`} />
                      ) : (
                        item.icon
                      )}
                      <span className="text-lg">{item.name}</span>
                    </div>
                    {!item.hasDropdown && <ChevronRight className="h-5 w-5" />}
                  </button>

                  {/* Dropdown Items */}
                  {item.hasDropdown && expandedSection === item.name && (
                    <div className="bg-gray-50">
                      {item.dropdownItems?.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => handleClick(dropdownItem.path)}
                          className={`block w-full text-left px-12 py-3 transition-colors border-b border-gray-200 last:border-b-0 ${
                            isActiveRoute(dropdownItem.path)
                              ? 'bg-red-100 text-red-400'
                              : 'text-gray-600 hover:bg-red-50 hover:text-red-400'
                          }`}
                        >
                          {dropdownItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Cart */}
              <button
                onClick={() => {
                  onCartClick();
                  onClose();
                }}
                className={`flex items-center justify-between w-full px-6 py-4 text-left transition-colors ${
                  isActiveRoute('/cart') 
                    ? 'bg-red-50 text-red-400' 
                    : 'text-gray-600 hover:bg-red-50 hover:text-red-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <ShoppingCart 
                      className={`h-5 w-5 transition-transform ${
                        animate ? "scale-125" : "scale-100"
                      }`} 
                    />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-lg">Cart</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Authentication Section */}
          <div className="border-t border-gray-200 p-6">
            {loading ? (
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
              </div>
            ) : user ? (
              <div className="space-y-1">
                {/* User Email */}
                <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50 rounded-lg mb-3">
                  {user.email}
                </div>
                
                {/* Profile Options */}
                <button
                  onClick={() => handleClick("/profile")}
                  className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors rounded-lg ${
                    isActiveRoute('/profile')
                      ? 'bg-red-50 text-red-400'
                      : 'text-gray-600 hover:bg-red-50 hover:text-red-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5" />
                    <span>My Profile</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => handleClick("/orders")}
                  className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors rounded-lg ${
                    isActiveRoute('/orders')
                      ? 'bg-red-50 text-red-400'
                      : 'text-gray-600 hover:bg-red-50 hover:text-red-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <ShoppingCart className="h-5 w-5" />
                    <span>My Orders</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => handleClick("/wishlist")}
                  className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors rounded-lg ${
                    isActiveRoute('/wishlist')
                      ? 'bg-red-50 text-red-400'
                      : 'text-gray-600 hover:bg-red-50 hover:text-red-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5" />
                    <span>Wishlist</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors rounded-lg mt-2"
                >
                  <X className="h-5 w-5 mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => handleClick('/login')}
                className={`w-full px-4 py-3 rounded-lg transition-colors ${
                  isActiveRoute('/login') || isActiveRoute('/register')
                    ? 'bg-red-500 text-white'
                    : 'bg-red-400 text-white hover:bg-red-500'
                }`}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;