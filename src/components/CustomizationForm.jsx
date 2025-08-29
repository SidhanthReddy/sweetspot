import React, { useState } from 'react';
import { useCart } from '../components/CartContext'; // Import useCart
import { useToast } from '../components/CustomToast'; // Import useToast
import FlavorSelect from './FlavorSelect';
import WeightSelector from './WeightSelector';
import BasicInputs from './BasicInputs';
import FileUpload from './FileUpload';
import SelectedModel from './SelectedModel';
import ModelsModal from './ModelsModal';
import CustomCakeConfirmation from './CustomCakeConfirmation';
import CartModal from './CartModal'; // Import CartModal
import QuickDrawModal from './QuickDrawModal'; 
import { ValidationModal } from "./ThemedModals";
const CustomizationForm = () => {
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart(); // Use the cart context
  const showToast = useToast(); // Use the toast hook
  const [formData, setFormData] = useState({
    flavor: '',
    weight: '',
    budgetRange: '', // Changed from approximateBudget
    deliveryDate: '',
    message: ''
  });
  const [modals, setModals] = useState({
    error: false,
    validation: false,
    errorMessage: "",
    errorTitle: "",
  });

  const showValidationModal = () => {
  setModals(prev => ({
    ...prev,
    validation: true,
    }));
  };

  const closeModals = () => {
      setModals({
        error: false,
        validation: false,
        errorMessage: "",
        errorTitle: "",
      });
  };


  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // Add cart modal state
  const [showQuickDrawModal, setShowQuickDrawModal] = useState(false);
  const existingModels = [
    { id: 1, name: 'Classic Wedding Cake', image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=512&h=512&fit=crop&auto=format', category: 'Wedding' },
    { id: 2, name: 'Birthday Celebration', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=512&h=512&fit=crop&auto=format', category: 'Birthday' },
    { id: 3, name: 'Chocolate Delight', image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=512&h=512&fit=crop&auto=format', category: 'Special' },
    { id: 4, name: 'Floral Fantasy', image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=512&h=512&fit=crop&auto=format', category: 'Wedding' },
    { id: 5, name: 'Kids Party Fun', image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=512&h=512&fit=crop&auto=format', category: 'Birthday' },
    { id: 6, name: 'Elegant Rose', image: 'https://images.unsplash.com/photo-1582180834946-f3d376b18376?w=512&h=512&fit=crop&auto=format', category: 'Special' },
    { id: 7, name: 'Tiered Masterpiece', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=512&h=512&fit=crop&auto=format', category: 'Wedding' },
    { id: 8, name: 'Cartoon Character', image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=512&h=512&fit=crop&auto=format', category: 'Birthday' }
  ];
    
  // Add this pricing calculation function
  const calculatePrice = () => {
  if (!formData.flavor || !formData.weight) {
    setCalculatedPrice(null);
    return null;
  }

  // Base pricing structure
  const basePrices = {
    '0.5': 400,  // 0.5 kg base price
    '1': 600,    // 1 kg base price
    '1.5': 850,  // 1.5 kg base price
    '2': 1100,   // 2 kg base price
    '2.5': 1350, // 2.5 kg base price
    '3': 1600,   // 3 kg base price
    '4': 2000,   // 4 kg base price
    '5': 2500    // 5 kg base price
  };

  // Flavor multipliers
  const flavorMultipliers = {
    'Vanilla': 1.0,
    'Chocolate': 1.1,
    'Strawberry': 1.1,
    'Red Velvet': 1.3,
    'Black Forest': 1.4,
    'Butterscotch': 1.2,
    'Pineapple': 1.1,
    'Mango': 1.2,
    'Coffee': 1.2,
    'Lemon': 1.1,
    'Carrot': 1.3,
    'Funfetti': 1.2
  };

  const weightValue = formData.weight.replace('kg', '');
  const basePrice = basePrices[weightValue] || 0;
  const flavorMultiplier = flavorMultipliers[formData.flavor] || 1.0;
  let calculatedPrice = basePrice * flavorMultiplier;

  // Additional cost for uploaded images (customization fee)
  if (selectedFiles.length > 0) {
    calculatedPrice += 200; // ₹200 customization fee for uploaded designs
  }

  // Additional cost for selected model
  if (selectedModel) {
    calculatedPrice += 150; // ₹150 premium for pre-designed models
  }
    const price = Math.round(calculatedPrice);
    setCalculatedPrice(price);
    return price;
};

  // Add this component to display the calculated price
  const PriceDisplay = () => {
    const price = calculatePrice();
    
    if (!price) return null;

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-center">
          <p className="text-sm text-[rgba(79,79,79,0.66)] mb-2">Estimated Price</p>
          <p className="text-2xl font-bold text-[rgba(224,99,99,0.85)]">₹{price.toLocaleString('en-IN')}</p>
          <p className="text-xs text-gray-500 mt-1">*Final price may vary based on design complexity</p>
        </div>
      </div>
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWeightSelect = (weight) => {
    setFormData(prev => ({ ...prev, weight }));
  };

  const handleFileSelect = (files) => {
    const fileList = Array.from(files);
    // Replace existing files with new selection (only keep the most recent)
    setSelectedFiles(fileList);
    setSelectedModel(null); // Clear selected model when uploading files
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setSelectedFiles([]); // Clear file uploads when selecting a model
    setShowModal(false);
  };

  // Create a custom cake object that matches the cart structure
  const createCustomCakeObject = () => {
    const finalPrice = calculatePrice();
    
    return {
      id: `custom_${Date.now()}`, // Unique ID for custom cake
      key: `custom_${Date.now()}`, // Add key for cart operations
      name: `Custom ${formData.flavor} Cake`,
      price: finalPrice,
      imageURL: selectedModel ? selectedModel.image : 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&auto=format', // Use model image or default cake image
      selectedWeight: parseFloat(formData.weight.replace('kg', '')),
      eggOption: 'Egg', // Default, could be made customizable
      messageOnCake: formData.message,
      description: `Custom ${formData.flavor} cake with ${formData.weight} weight`,
      deliveryTime: formData.deliveryDate,
      rating: 5,
      isCustom: true, // Flag to identify custom cakes
      customDetails: {
        flavor: formData.flavor,
        weight: formData.weight,
        budgetRange: formData.budgetRange,
        deliveryDate: formData.deliveryDate,
        uploadedFiles: selectedFiles.map(file => file.name),
        selectedModel: selectedModel ? selectedModel.name : null,
        specialRequests: formData.message
      },
      quantity: 1
    };
  };

  const handleSubmit = () => {
    // Calculate the final price before submission
    const finalPrice = calculatePrice(); 
    if (!formData.flavor || !formData.weight || !formData.budgetRange || !finalPrice) {
      showValidationModal();
      return;
    }

    // Just show confirmation modal, don't add to cart yet
    setShowConfirmation(true);
    
    console.log('Form submitted:', formData);
    console.log('Files:', selectedFiles);
    console.log('Selected Model:', selectedModel);
    console.log('Final Price:', finalPrice);
  };

  // Handle confirmation modal close and reset form
  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    
    // Reset form after successful submission
    setFormData({
      flavor: '',
      weight: '',
      budgetRange: '',
      deliveryDate: '',
      message: ''
    });
    setSelectedFiles([]);
    setSelectedModel(null);
    setCalculatedPrice(null);
  };

  // Handle user confirmation - this is where we actually add to cart
  const handleUserConfirmation = () => {
    // Create custom cake object
    const customCake = createCustomCakeObject();
    
    // Add to cart
    addToCart(customCake);
    
    // Show success toast
    showToast.success(`🎂 Custom ${formData.flavor} Cake added to Cart!`);
    
    console.log('Custom Cake Object added to cart:', customCake);
  };

  // Handle opening cart modal
  const handleOpenCart = () => {
    setIsCartModalOpen(true);
  };

  // Handle closing cart modal
  const handleCloseCart = () => {
    setIsCartModalOpen(false);
  };

  // Handle cart quantity updates
  const handleUpdateQuantity = (itemKey, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemKey);
    } else {
      updateQuantity(itemKey, newQuantity);
    }
  };

  // Handle removing items from cart
  const handleRemoveItem = (itemKey) => {
    removeFromCart(itemKey);
  };

  const handleQuickDrawImageSelect = (generatedModel) => {
  // Handle the selected AI-generated image
  // Set the generated model as the selected model (similar to handleModelSelect)
  setSelectedModel(generatedModel);
  setSelectedFiles([]); // Clear file uploads when selecting AI generated image
  setShowQuickDrawModal(false); // Close the modal
};

  return (
    <>
      <div className="w-full p-6 bg-white rounded-lg font-parastoo text-[rgba(79,79,79,0.66)]">
        <div className="space-y-6">
                <p className="text-[rgba(79,79,79,0.66)] font-parastoo mb-6 text-center text-3xl mx-auto">
                   Fill up this form to get started on your cake journey.
                  </p>
          <FlavorSelect value={formData.flavor} onChange={handleInputChange} />
          <WeightSelector selectedWeight={formData.weight} onWeightSelect={handleWeightSelect} />
          <BasicInputs formData={formData} onChange={handleInputChange} />
          
          <FileUpload
            isDragOver={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileSelect={handleFileSelect}
            selectedFiles={selectedFiles}
            onShowModal={() => setShowModal(true)}
            onShowQuickDrawModal={() => setShowQuickDrawModal(true)}
          />
          
          <SelectedModel 
            selectedModel={selectedModel} 
            onRemove={() => setSelectedModel(null)} 
          />
          

          
          {/* Display calculated price */}
          <PriceDisplay />
          
          {/* Message/Extra Info */}
          <div>
            <textarea
              name="message"
              placeholder="Message / Extra Info*"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-[rgba(224,99,99,0.85)] text-sm resize-none text-gray-700"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[rgba(224,99,99,0.85)] text-white px-8 py-3 text-sm font-medium hover:bg-amber-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!formData.flavor || !formData.weight || !formData.budgetRange}
            >
              SUBMIT
            </button>
          </div>
          <div>

            <p className="text-xs text-gray-500">
              Your custom cake will be added to your cart and you can proceed to <span className="Love-highlighted-text">checkout</span> once you are done customizing.
            </p>
            <p className="text-xs text-gray-500">
              By submitting this form, you agree to our <a href="/terms" className="text-[rgba(224,99,99,0.85)] hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[rgba(224,99,99,0.85)] hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
      <ModelsModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onModelSelect={handleModelSelect}
        existingModels={existingModels}
      />
      {/* Custom Cake Confirmation Modal */}
      <CustomCakeConfirmation
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        onConfirm={handleUserConfirmation}
        onOpenCart={handleOpenCart} // Pass the cart opener function
        calculatedPrice={calculatedPrice}
        budgetRange={formData.budgetRange}
        formData={formData}
      />
      <QuickDrawModal
      showModal={showQuickDrawModal}
      onClose={() => setShowQuickDrawModal(false)}
      onImageSelect={handleQuickDrawImageSelect}
    />
        <ValidationModal
          isOpen={modals.validation}
          onClose={closeModals}
          title="Complete All Fields"
          message="Please fill out all required fields: cake flavor, weight, budget range, and ensure a final price is calculated."
          actionText="Got it"
        />
    </>
  );
};

export default CustomizationForm;