import React, { useState } from 'react';

const ModelsModal = ({ showModal, onClose, onModelSelect, existingModels }) => {
  const [selectedImageForPreview, setSelectedImageForPreview] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImageForPreview(imageUrl);
  };

  const handleSelectModel = (model) => {
    onModelSelect(model);
    handleClose();
  };

  const handleClose = () => {
    setSelectedImageForPreview(null);
    onClose();
  };

  if (!showModal) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]" >
        <div className="bg-white rounded-lg max-w-5xl w-full max-h-[85vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Select from Existing Models</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Models Display */}
            {existingModels && existingModels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {existingModels.map((model, idx) => (
                  <div
                    key={model.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={model.image}
                        draggable="false"
                        alt={model.name}
                        className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => handleImageClick(model.image)}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&auto=format';
                        }}
                      />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {model.category}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800 mb-1 text-sm">{model.name}</h3>
                      <button
                        onClick={() => handleSelectModel(model)}
                        className="bg-[rgba(224,99,99,0.85)] text-white px-4 py-2 text-sm font-medium hover:bg-red-600 rounded transition-colors w-full mt-2"
                      >
                        Select This Model
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-8 text-gray-500">
                <div className="mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg font-medium mb-2">No Models Available</p>
                <p className="text-sm">No existing cake models found to display</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImageForPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden p-4">
            <button
              onClick={() => setSelectedImageForPreview(null)}
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors z-10"
            >
              ×
            </button>
            <img
              draggable="false"
              src={selectedImageForPreview}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => {
                  // Find the selected model from the preview image
                  const selectedModel = existingModels.find(model => model.image === selectedImageForPreview);
                  if (selectedModel) {
                    handleSelectModel(selectedModel);
                  }
                }}
                className="bg-[rgba(224,99,99,0.85)] text-white px-6 py-3 text-sm font-medium hover:bg-red-600 rounded-lg transition-colors shadow-lg"
              >
                Select This Model
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModelsModal;