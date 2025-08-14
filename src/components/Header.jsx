import React, { useState } from 'react';
import { Search, User, ShoppingCart, Phone, ChevronDown, Menu, Heart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Cakes', hasDropdown: true },
    { name: 'Cupcakes', hasDropdown: true },
    { name: 'Pastries', hasDropdown: false },
    { name: 'Custom Orders', hasDropdown: false },
    { name: 'Occasions', hasDropdown: true },
    { name: 'About Us', hasDropdown: false }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Top bar with slogan */}
        <div className="hidden md:flex justify-center items-center py-2 text-sm border-b border-gray-50">
          <p className="text-xl italic font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>
            "Where every bite tells a sweet story"
          </p>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-5xl font-bold font-parastoo" style={{ color: 'rgba(79,79,79,0.66)' }}>
              Sweet<span style={{ color: 'rgba(224, 99, 99, 0.85)' }}>Spot</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <button className="flex items-center space-x-1 font-parastoo text-lg transition-colors hover:opacity-80" 
                        style={{ color: 'rgba(79,79,79,0.7)' }}>
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </button>
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                    <div className="py-2">
                      <a href="#" className="block px-4 py-2 font-parastoo hover:bg-gray-50 transition-colors" 
                         style={{ color: 'rgba(79,79,79,0.7)' }}>Birthday Cakes</a>
                      <a href="#" className="block px-4 py-2 font-parastoo hover:bg-gray-50 transition-colors" 
                         style={{ color: 'rgba(79,79,79,0.7)' }}>Wedding Cakes</a>
                      <a href="#" className="block px-4 py-2 font-parastoo hover:bg-gray-50 transition-colors" 
                         style={{ color: 'rgba(79,79,79,0.7)' }}>Designer Cakes</a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" 
                      style={{ color: 'rgba(79,79,79,0.7)' }} />
              <input
                type="text"
                placeholder="Search for your perfect cake..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:border-transparent font-parastoo"
                style={{ focusRingColor: 'rgba(224, 99, 99, 0.85)' }}
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 font-parastoo" 
                 style={{ color: 'rgba(79,79,79,0.7)' }}>
              <Phone className="h-4 w-4" />
              <span className="text-sm">+91 98765 43210</span>
            </div>
            
            <button className="p-2 transition-colors hover:opacity-80" 
                    style={{ color: 'rgba(79,79,79,0.7)' }}>
              <Heart className="h-5 w-5" />
            </button>
            
            <button className="p-2 transition-colors hover:opacity-80" 
                    style={{ color: 'rgba(79,79,79,0.7)' }}>
              <User className="h-5 w-5" />
            </button>
            
            <button className="relative p-2 transition-colors hover:opacity-80" 
                    style={{ color: 'rgba(79,79,79,0.7)' }}>
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-inter"
                    style={{ backgroundColor: 'rgba(224, 99, 99, 0.85)' }}>3</span>
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 transition-colors hover:opacity-80"
              style={{ color: 'rgba(79,79,79,0.7)' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" 
                        style={{ color: 'rgba(79,79,79,0.7)' }} />
                <input
                  type="text"
                  placeholder="Search for your perfect cake..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:border-transparent font-parastoo"
                />
              </div>
              
              {/* Mobile Menu Items */}
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className="text-left font-parastoo text-lg transition-colors hover:opacity-80 py-2"
                  style={{ color: 'rgba(79,79,79,0.7)' }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;