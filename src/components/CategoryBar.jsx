import React from 'react';
import { categoryData } from '../data/data.js';

const CategoryBar = ({ selectedCategory, setSelectedCategory }) => {
  const handleCategoryClick = (categoryKey) => {
    if (selectedCategory === categoryKey) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryKey);
    }
  };

  return (
    <div className="bg-soft-pink pt-12 pb-8 border-b border-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold font-parastoo mb-2" style={{ color: 'rgba(79,79,79,0.7)' }}>
            Explore Our Collection
          </h2>
          <p className="text-xl italic font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>
            "Crafted with love, delivered with care"
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 px-6 w-full">
            {categoryData.map((category) => (
              <div
                key={category.id}
                className={`flex-shrink-0 text-center cursor-pointer group transition-all duration-300 ${
                  selectedCategory === category.key ? 'transform scale-105' : ''
                }`}
                onClick={() => handleCategoryClick(category.key)}
              >
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-all duration-300 border-2 mb-3 ${
                  selectedCategory === category.key 
                    ? 'shadow-lg' 
                    : 'border-gray-100'
                }`}
                style={{
                  borderColor: selectedCategory === category.key ? 'rgba(224, 99, 99, 0.85)' : undefined
                }}>
                  <img
                    src={category.imageURL}
                    alt={category.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300"
                  />
                </div>
                <p
                  className={`mt-3 text-sm font-medium font-parastoo transition-colors ${
                    selectedCategory === category.key 
                      ? 'font-semibold' 
                      : 'group-hover:opacity-80'
                  }`}
                  style={{
                    color: selectedCategory === category.key 
                      ? 'rgba(224, 99, 99, 0.85)' 
                      : 'rgba(79,79,79,0.7)'
                  }}
                >
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;