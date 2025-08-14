import React from 'react';

const SelectedModel = ({ selectedModel, onRemove }) => {
  if (!selectedModel) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">Selected Model:</p>
      <div className="bg-gray-50 p-4 rounded flex items-center gap-4">
        <img 
          src={selectedModel.image} 
          alt={selectedModel.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <p className="font-medium text-gray-800">{selectedModel.name}</p>
          <p className="text-sm text-gray-600">{selectedModel.category}</p>
        </div>
        <button
          onClick={onRemove}
          className="ml-auto text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default SelectedModel;
