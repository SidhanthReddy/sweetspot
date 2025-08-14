// import React from 'react';
// import { X } from 'lucide-react';

// const FilterSidebar = ({ 
//   filters, 
//   setFilters, 
//   isOpen, 
//   setIsOpen 
// }) => {
//   const handleFilterChange = (filterType, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterType]: value
//     }));
//   };

//   const handlePriceChange = (type, value) => {
//     setFilters(prev => ({
//       ...prev,
//       priceRange: {
//         ...prev.priceRange,
//         [type]: value
//       }
//     }));
//   };

//   const clearAllFilters = () => {
//     setFilters({
//       healthy: false,
//       sugarFree: false,
//       eggless: false,
//       vegan: false,
//       priceRange: { min: '', max: '' }
//     });
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
      
//       {/* Sidebar */}
//       <div className={`
//         fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-full 
//         bg-white shadow-sm lg:shadow-none z-50 lg:z-auto border-r border-gray-100
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//       `}>
//         <div className="p-6">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-3xl font-bold font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Filters
//             </h3>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={clearAllFilters}
//                 className="text-sm font-parastoo transition-colors hover:opacity-80"
//                 style={{ color: 'rgba(224, 99, 99, 0.85)' }}
//               >
//                 Clear All
//               </button>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="lg:hidden p-1 transition-colors hover:opacity-80"
//                 style={{ color: 'rgba(79,79,79,0.7)' }}
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           {/* Diet Preferences */}
//           <div className="mb-6">
//             <h4 className="font-medium font-parastoo text-lg mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Special Dietary
//             </h4>
//             <div className="space-y-4">
//               <label className="flex items-center space-x-3 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   checked={filters.healthy}
//                   onChange={(e) => handleFilterChange('healthy', e.target.checked)}
//                   className="w-4 h-4 rounded focus:ring-2 border-gray-300"
//                   style={{ 
//                     accentColor: 'rgba(224, 99, 99, 0.85)',
//                     focusRingColor: 'rgba(224, 99, 99, 0.85)'
//                   }}
//                 />
//                 <span className="font-parastoo group-hover:opacity-80 transition-colors" 
//                       style={{ color: 'rgba(79,79,79,0.7)' }}>
//                   Healthy Options
//                 </span>
//               </label>
              
//               <label className="flex items-center space-x-3 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   checked={filters.sugarFree}
//                   onChange={(e) => handleFilterChange('sugarFree', e.target.checked)}
//                   className="w-4 h-4 rounded focus:ring-2 border-gray-300"
//                   style={{ 
//                     accentColor: 'rgba(224, 99, 99, 0.85)',
//                     focusRingColor: 'rgba(224, 99, 99, 0.85)'
//                   }}
//                 />
//                 <span className="font-parastoo group-hover:opacity-80 transition-colors" 
//                       style={{ color: 'rgba(79,79,79,0.7)' }}>
//                   Sugar Free
//                 </span>
//               </label>
              
//               <label className="flex items-center space-x-3 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   checked={filters.eggless}
//                   onChange={(e) => handleFilterChange('eggless', e.target.checked)}
//                   className="w-4 h-4 rounded focus:ring-2 border-gray-300"
//                   style={{ 
//                     accentColor: 'rgba(224, 99, 99, 0.85)',
//                     focusRingColor: 'rgba(224, 99, 99, 0.85)'
//                   }}
//                 />
//                 <span className="font-parastoo group-hover:opacity-80 transition-colors" 
//                       style={{ color: 'rgba(79,79,79,0.7)' }}>
//                   Eggless
//                 </span>
//               </label>
              
//               <label className="flex items-center space-x-3 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   checked={filters.vegan}
//                   onChange={(e) => handleFilterChange('vegan', e.target.checked)}
//                   className="w-4 h-4 rounded focus:ring-2 border-gray-300"
//                   style={{ 
//                     accentColor: 'rgba(224, 99, 99, 0.85)',
//                     focusRingColor: 'rgba(224, 99, 99, 0.85)'
//                   }}
//                 />
//                 <span className="font-parastoo group-hover:opacity-80 transition-colors" 
//                       style={{ color: 'rgba(79,79,79,0.7)' }}>
//                   Vegan
//                 </span>
//               </label>
//             </div>
//           </div>

//           {/* Egg Options */}
//           <div className="mb-6">
//             <h4 className="font-medium font-parastoo text-lg mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Egg Preference
//             </h4>
//             <div className="space-y-3">
//               <label className="flex items-center space-x-3 cursor-pointer group">
//                 <input
//                   type="radio"
//                   name="eggOption"
//                   value="both"
//                   checked={filters.eggOption === 'both'}
//                   onChange={(e) => handleFilterChange('eggOption', e.target.value)}
//                   className="w-4 h-4 focus:ring-2 border-gray-300"
//                   style={{ 
//                     accentColor: 'rgba(224, 99, 99, 0.85)',
//                     focusRingColor: 'rgba(224, 99, 99, 0.85)'
//                   }}
//                 />
//                 <span className="font-parastoo group-hover:opacity-80 transition-colors" 
//                       style={{ color: 'rgba(79,79,79,0.7)' }}>
//                   Both
//                 </span>
//               </label>
              
//               <label className="flex items-center space-x-3 cursor-pointer group">
//                 <input
//                   type="radio"
//                   name="eggOption"
//                   value="Egg"
//                   checked={filters.eggOption === 'Egg'}
//                   onChange={(e) => handleFilterChange('eggOption', e.target.value)}
//                   className="w-4 h-4 focus:ring-2 border-gray-300"
//                   style={{ 
//                     accentColor: 'rgba(224, 99, 99, 0.85)',
//                     focusRingColor: 'rgba(224, 99, 99, 0.85)'
//                   }}
//                 />
//                 <span className="font-parastoo group-hover:opacity-80 transition-colors" 
//                       style={{ color: 'rgba(79,79,79,0.7)' }}>
//                   With Egg
//                 </span>
//               </label>
              
//               <label className="flex items-center space-x-3 cursor-pointer group">
//                 <input
//                   type="radio"
//                   name="eggOption"
//                   value="Eggless"
//                   checked={filters.eggOption === 'Eggless'}
//                   onChange={(e) => handleFilterChange('eggOption', e.target.value)}
//                   className="w-4 h-4 focus:ring-2 border-gray-300"
//                   style={{ 
//                     accentColor: 'rgba(224, 99, 99, 0.85)',
//                     focusRingColor: 'rgba(224, 99, 99, 0.85)'
//                   }}
//                 />
//                 <span className="font-parastoo group-hover:opacity-80 transition-colors" 
//                       style={{ color: 'rgba(79,79,79,0.7)' }}>
//                   Eggless Only
//                 </span>
//               </label>
//             </div>
//           </div>

//           {/* Weight Filter */}
//           <div className="mb-6">
//             <h4 className="font-medium font-parastoo text-lg mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Weight
//             </h4>
//             <div className="grid grid-cols-3 gap-2">
//               {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((weight) => (
//                 <button
//                   key={weight}
//                   onClick={() => handleFilterChange('selectedWeight', weight)}
//                   className={`p-2 text-sm border border-gray-200 rounded-lg hover:shadow-sm transition-all font-parastoo ${
//                     filters.selectedWeight === weight ? 'shadow-sm' : ''
//                   }`}
//                   style={{ 
//                     backgroundColor: filters.selectedWeight === weight ? 'rgba(224, 99, 99, 0.1)' : 'transparent',
//                     borderColor: filters.selectedWeight === weight ? 'rgba(224, 99, 99, 0.85)' : 'rgba(224, 99, 99, 0.3)',
//                     color: filters.selectedWeight === weight ? 'rgba(224, 99, 99, 0.85)' : 'rgba(79,79,79,0.7)'
//                   }}
//                 >
//                   {weight} kg
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Product Type Filter */}
//           <div className="mb-6">
//             <h4 className="font-medium font-parastoo text-lg mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Product Type
//             </h4>
//             <div className="space-y-3 max-h-48 overflow-y-auto">
//               {[
//                 'Layer Cake', 'Birthday Cake', 'Cheesecake', 'Cupcakes', 
//                 'Mousse Cake', 'Truffle Cake', 'Fudge Cake', 'Shortcake', 
//                 'Spice Cake', 'Citrus Cake'
//               ].map((type) => (
//                 <label key={type} className="flex items-center space-x-3 cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={filters.productTypes.includes(type)}
//                     onChange={(e) => {
//                       const newTypes = e.target.checked
//                         ? [...filters.productTypes, type]
//                         : filters.productTypes.filter(t => t !== type);
//                       handleFilterChange('productTypes', newTypes);
//                     }}
//                     className="w-4 h-4 rounded focus:ring-2 border-gray-300"
//                     style={{ 
//                       accentColor: 'rgba(224, 99, 99, 0.85)',
//                       focusRingColor: 'rgba(224, 99, 99, 0.85)'
//                     }}
//                   />
//                   <span className="font-parastoo group-hover:opacity-80 transition-colors text-sm" 
//                         style={{ color: 'rgba(79,79,79,0.7)' }}>
//                     {type}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Price Range */}
//           <div className="mb-6">
//             <h4 className="font-medium font-parastoo text-lg mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Price Range
//             </h4>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-parastoo mb-2" style={{ color: 'rgba(79,79,79,0.7)' }}>
//                   From ₹
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Min price"
//                   value={filters.priceRange.min}
//                   onChange={(e) => handlePriceChange('min', e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent font-parastoo"
//                   style={{ focusRingColor: 'rgba(224, 99, 99, 0.85)' }}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-parastoo mb-2" style={{ color: 'rgba(79,79,79,0.7)' }}>
//                   To ₹
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Max price"
//                   value={filters.priceRange.max}
//                   onChange={(e) => handlePriceChange('max', e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent font-parastoo"
//                   style={{ focusRingColor: 'rgba(224, 99, 99, 0.85)' }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Quick Filters */}
//           <div className="mb-4">
//             <h4 className="font-medium font-parastoo text-lg mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Quick Filters
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {['Best Seller', 'Under ₹500', 'Premium', 'Same Day', 'New Arrivals'].map((filter) => (
//                 <button
//                   key={filter}
//                   className="px-3 py-2 text-xs border border-gray-200 rounded-full hover:shadow-sm transition-all font-parastoo"
//                   style={{ 
//                     color: 'rgba(79,79,79,0.7)',
//                     borderColor: 'rgba(224, 99, 99, 0.3)'
//                   }}
//                 >
//                   {filter}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FilterSidebar;
import React from 'react';
import { X } from 'lucide-react';

const FilterSidebar = ({ 
  filters, 
  setFilters, 
  isOpen, 
  setIsOpen 
}) => {
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePriceChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      healthy: false,
      sugarFree: false,
      eggless: false,
      vegan: false,
      eggOption: 'both',
      selectedWeight: null,
      productTypes: [],
      priceRange: { min: '', max: '' }
    });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-64
        bg-white shadow-sm lg:shadow-none z-50 lg:z-auto border-r border-gray-100
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="p-6 overflow-y-auto h-full lg:h-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>
              Filters
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearAllFilters}
                className="text-sm font-parastoo transition-colors hover:opacity-80"
                style={{ color: 'rgba(224, 99, 99, 0.85)' }}
              >
                Clear All
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1 transition-colors hover:opacity-80"
                style={{ color: 'rgba(79,79,79,0.7)' }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Dietary Preferences */}
          <Section title="Special Dietary">
            {['healthy', 'sugarFree', 'eggless', 'vegan'].map((key) => (
              <Checkbox
                key={key}
                label={key === 'sugarFree' ? 'Sugar Free' : key.charAt(0).toUpperCase() + key.slice(1)}
                checked={filters[key]}
                onChange={(e) => handleFilterChange(key, e.target.checked)}
              />
            ))}
          </Section>

          {/* Egg Options */}
          <Section title="Egg Preference">
            {['both', 'Egg', 'Eggless'].map((option) => (
              <Radio
                key={option}
                name="eggOption"
                label={option === 'both' ? 'Both' : option === 'Egg' ? 'With Egg' : 'Eggless Only'}
                value={option}
                checked={filters.eggOption === option}
                onChange={(e) => handleFilterChange('eggOption', e.target.value)}
              />
            ))}
          </Section>

          {/* Weight */}
          <Section title="Weight">
            <div className="grid grid-cols-3 gap-2">
              {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((weight) => (
                <button
                  key={weight}
                  onClick={() => handleFilterChange('selectedWeight', weight)}
                  className={`p-2 text-sm border rounded-lg transition-all font-parastoo ${
                    filters.selectedWeight === weight ? 'shadow-sm' : ''
                  }`}
                  style={{
                    backgroundColor: filters.selectedWeight === weight ? 'rgba(224, 99, 99, 0.1)' : 'transparent',
                    borderColor: filters.selectedWeight === weight ? 'rgba(224, 99, 99, 0.85)' : 'rgba(224, 99, 99, 0.3)',
                    color: 'rgba(79,79,79,0.7)'
                  }}
                >
                  {weight} kg
                </button>
              ))}
            </div>
          </Section>

          {/* Product Types */}
          <Section title="Product Type">
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {[
                'Layer Cake', 'Birthday Cake', 'Cheesecake', 'Cupcakes', 
                'Mousse Cake', 'Truffle Cake', 'Fudge Cake', 'Shortcake', 
                'Spice Cake', 'Citrus Cake'
              ].map((type) => (
                <Checkbox
                  key={type}
                  label={type}
                  checked={filters.productTypes.includes(type)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...filters.productTypes, type]
                      : filters.productTypes.filter(t => t !== type);
                    handleFilterChange('productTypes', newTypes);
                  }}
                />
              ))}
            </div>
          </Section>

          {/* Price Range */}
          <Section title="Price Range">
            <div className="space-y-4">
              {['min', 'max'].map((type) => (
                <div key={type}>
                  <label className="block text-sm font-parastoo mb-2" style={{ color: 'rgba(79,79,79,0.7)' }}>
                    {type === 'min' ? 'From ₹' : 'To ₹'}
                  </label>
                  <input
                    type="number"
                    placeholder={type === 'min' ? 'Min price' : 'Max price'}
                    value={filters.priceRange[type]}
                    onChange={(e) => handlePriceChange(type, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none font-parastoo"
                    style={{ focusRingColor: 'rgba(224, 99, 99, 0.85)' }}
                  />
                </div>
              ))}
            </div>
          </Section>

          {/* Quick Filters */}
          <Section title="Quick Filters">
            <div className="flex flex-wrap gap-2">
              {['Best Seller', 'Under ₹500', 'Premium', 'Same Day', 'New Arrivals'].map((filter) => (
                <button
                  key={filter}
                  className="px-3 py-2 text-xs border rounded-full font-parastoo"
                  style={{ 
                    color: 'rgba(79,79,79,0.7)',
                    borderColor: 'rgba(224, 99, 99, 0.3)' 
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

// Reusable Components
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h4 className="font-medium font-parastoo text-lg mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
      {title}
    </h4>
    {children}
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-gray-300"
      style={{ accentColor: 'rgba(224, 99, 99, 0.85)' }}
    />
    <span className="font-parastoo text-sm group-hover:opacity-80 transition-colors" style={{ color: 'rgba(79,79,79,0.7)' }}>
      {label}
    </span>
  </label>
);

const Radio = ({ name, value, label, checked, onChange }) => (
  <label className="flex items-center space-x-3 cursor-pointer group">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 border-gray-300"
      style={{ accentColor: 'rgba(224, 99, 99, 0.85)' }}
    />
    <span className="font-parastoo group-hover:opacity-80 transition-colors text-sm" style={{ color: 'rgba(79,79,79,0.7)' }}>
      {label}
    </span>
  </label>
);

export default FilterSidebar;
