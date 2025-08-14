// WeightSelector.jsx
import React from 'react';

const WeightSelector = ({ selectedWeight, onWeightSelect }) => {
  const weights = ['0.5kg', '1kg', '1.5kg', '2kg', '2.5kg', '3kg'];

  return (
    <div>
      <label className="block text-sm font-medium text-[rgba(79,79,79,0.66)] mb-3">Weight*</label>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {weights.map((weight) => (
          <button
            key={weight}
            type="button"
            onClick={() => onWeightSelect(weight)}
            className={`px-4 py-2 text-sm border rounded transition-colors ${
              selectedWeight === weight
                ? 'bg-[rgba(224,99,99,0.85)] text-white border-[rgba(224,99,99,0.85)]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-[rgba(224,99,99,0.85)]'
            }`}
          >
            {weight}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeightSelector;