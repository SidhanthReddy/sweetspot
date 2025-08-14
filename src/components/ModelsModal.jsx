import React from 'react';

const ModelsModal = ({ showModal, onClose, onModelSelect, existingModels }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Select from Existing Models</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {existingModels.map((model) => (
              <div
                key={model.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onModelSelect(model)}
              >
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <h3 className="font-medium text-gray-800 mb-1">{model.name}</h3>
                <p className="text-sm text-gray-600">{model.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelsModal;