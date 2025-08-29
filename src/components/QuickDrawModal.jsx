import React, { useState, useRef, useEffect } from 'react';
import CreateImg from './CreateImg';

const QuickDrawModal = ({ showModal, onClose, onImageSelect }) => {
  const [selectedImageForPreview, setSelectedImageForPreview] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [generatingNewBatch, setGeneratingNewBatch] = useState(false);
  const createImgRef = useRef(null);

  // Listen for generated images from CreateImg component
  const handleImageGeneration = (images, isAppend = false) => {
    if (isAppend) {
      // Append new images to existing ones
      setGeneratedImages(prev => [...prev, ...images]);
    } else {
      // Replace existing images (first batch or new query)
      setGeneratedImages(images);
      setCurrentBatch(1);
    }
    setGenerating(false);
    setGeneratingNewBatch(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && createImgRef.current && !generating) {
      setGenerating(true);
      setGeneratingNewBatch(true); // Show loading for first batch too
      // Trigger image generation in CreateImg component
      createImgRef.current.generateImages(1);
    }
  };

  const handleGenerateMore = async () => {
    if (currentBatch >= 3 || !createImgRef.current) return; // Max 9 images (3 batches of 3)
    
    setGenerating(true);
    setGeneratingNewBatch(true);
    const nextBatch = currentBatch + 1;
    setCurrentBatch(nextBatch);
    
    // Generate next batch
    await createImgRef.current.generateImages(nextBatch);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageForPreview(imageUrl);
  };

  const handleSelectImage = (imageUrl, prompt) => {
    // Create a mock model object similar to existing models
    const generatedModel = {
      id: `generated_${Date.now()}`,
      name: `AI Generated: ${prompt.length > 50 ? prompt.substring(0, 50) + '...' : prompt}`,
      image: imageUrl,
      category: 'AI Generated'
    };
    
    onImageSelect(generatedModel);
    handleClose();
  };

  const handleClose = () => {
    setGeneratedImages([]);
    setSelectedImageForPreview(null);
    setCurrentBatch(1);
    setGenerating(false);
    setGeneratingNewBatch(false);
    if (createImgRef.current) {
      createImgRef.current.reset(); // Reset CreateImg component
    }
    onClose();
  };

  const canGenerateMore = currentBatch < 3 && generatedImages.length > 0 && !generating;
  const totalPossibleImages = 9;
  const remainingImages = totalPossibleImages - generatedImages.length;

  if (!showModal) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-5xl w-full max-h-[85vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">QuickDraw - AI Cake Generator</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* CreateImg Component Integration */}
            <div className="mb-6">
              <CreateImg 
                ref={createImgRef}
                onImagesGenerated={handleImageGeneration}
                isModal={true}
                onGenerateStart={(isNewQuery = false) => {
                  if (isNewQuery) {
                    // Reset everything for new query
                    setGeneratedImages([]);
                    setCurrentBatch(1);
                  }
                  setGenerating(true);
                  setGeneratingNewBatch(true);
                }}
              />
            </div>

            {/* Progress Indicator */}
            {generatedImages.length > 0 && (
              <div className="mb-4 text-center">
                <p className="text-sm text-gray-600">
                  Showing {generatedImages.length} of {totalPossibleImages} possible designs
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-[rgba(224,99,99,0.85)] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(generatedImages.length / totalPossibleImages) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Generated Images Display */}
            {generatedImages.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {generatedImages.map((imageData, idx) => (
                    <div
                      key={`${imageData.batch}-${idx}`}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative">
                        <img
                          src={imageData.url}
                          draggable="false"
                          alt={`Generated Cake ${idx + 1}`}
                          className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => handleImageClick(imageData.url)}
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&auto=format';
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          Design {idx + 1}
                        </div>
                      </div>
                      <div className="p-3 text-center">
                        <button
                          onClick={() => handleSelectImage(imageData.url, imageData.prompt)}
                          className="bg-[rgba(224,99,99,0.85)] text-white px-4 py-2 text-sm font-medium hover:bg-red-600 rounded transition-colors w-full"
                        >
                          Select This Design
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Loading Display for New Batch */}
                {generatingNewBatch && (
                  <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgba(224,99,99,0.85)]"></div>
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        {generatedImages.length === 0 
                          ? "Generating 3 Unique Designs..." 
                          : `Generating ${remainingImages > 3 ? 3 : remainingImages} More Unique Designs...`
                        }
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Our AI is creating new variations based on your description
                      </p>
                      <div className="flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-[rgba(224,99,99,0.85)] rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-[rgba(224,99,99,0.85)] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-[rgba(224,99,99,0.85)] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Generate More Button */}
                <div className="text-center border-t pt-6">
                  {canGenerateMore ? (
                    <button
                      onClick={handleGenerateMore}
                      disabled={generating}
                      className="bg-gradient-to-r from-[rgba(224,99,99,0.85)] to-red-600 text-white px-8 py-3 text-sm font-medium hover:from-red-600 hover:to-red-700 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      Generate {remainingImages > 3 ? 3 : remainingImages} More Unique Designs
                    </button>
                  ) : (
                    !generating && (
                      <div className="text-gray-500 text-sm">
                        {generatedImages.length >= 9 ? 
                          "You've generated the maximum of 9 unique designs!" :
                          "Generate your first batch to see more options"
                        }
                      </div>
                    )
                  )}
                </div>
              </>
            )}

            {/* Empty State */}
            {generatedImages.length === 0 && !generating && (
              <div className="text-center py-8 text-gray-500">
                <div className="mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg font-medium mb-2">Ready to Create Amazing Cakes!</p>
                <p className="text-sm">Describe your dream cake and our AI will generate 3 unique realistic designs</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImageForPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
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
                  // Find the current prompt from the selected image
                  const selectedImage = generatedImages.find(img => img.url === selectedImageForPreview);
                  const promptToUse = selectedImage?.prompt || createImgRef.current?.getCurrentPrompt?.() || 'Custom Design';
                  handleSelectImage(selectedImageForPreview, promptToUse);
                }}
                className="bg-[rgba(224,99,99,0.85)] text-white px-6 py-3 text-sm font-medium hover:bg-red-600 rounded-lg transition-colors shadow-lg"
              >
                Select This Design
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickDrawModal;