import React from 'react';

const BasicInputs = ({ formData, onChange }) => {
  const budgetRanges = [
    { value: '500-1000', label: '₹500 - ₹1,000', min: 500, max: 1000 },
    { value: '1000-2000', label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
    { value: '2000-3500', label: '₹2,000 - ₹3,500', min: 2000, max: 3500 },
    { value: '3500-5000', label: '₹3,500 - ₹5,000', min: 3500, max: 5000 },
    { value: '5000-7500', label: '₹5,000 - ₹7,500', min: 5000, max: 7500 },
    { value: '7500-10000', label: '₹7,500 - ₹10,000', min: 7500, max: 10000 },
    { value: '10000+', label: '₹10,000+', min: 10000, max: null }
  ];

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-[rgba(79,79,79,0.66)] mb-3">Budget Range*</label>
        <select
          name="budgetRange"
          value={formData.budgetRange || ''}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-[rgba(224,99,99,0.85)] text-sm text-gray-700"
        >
          <option value="">Select Budget Range*</option>
          {budgetRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default BasicInputs;