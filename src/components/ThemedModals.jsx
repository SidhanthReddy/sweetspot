import React from 'react';
import { AlertCircle, CheckCircle, X, LogIn, FileText } from 'lucide-react';

// Base Modal Component
const BaseModal = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-3xl border border-rose-200 shadow-[0_8px_40px_rgba(244,63,94,0.15)] max-w-md w-full mx-4 ${className}`}>
        {children}
      </div>
    </div>
  );
};

// Error Modal (replaces error alerts)
export const ErrorModal = ({ isOpen, onClose, title, message, actionText = "Try Again", onAction }) => (
  <BaseModal isOpen={isOpen} onClose={onClose}>
    <div className="p-8 text-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Error icon */}
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-3">
        {title || "Something went wrong"}
      </h3>
      <p className="text-[rgba(79,79,79,0.6)] font-parastoo mb-6">
        {message}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onClose}
          className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold font-parastoo hover:bg-gray-50 transition-all duration-200"
        >
          Cancel
        </button>
        {onAction && (
          <button
            onClick={() => {
              onAction();
              onClose();
            }}
            className="px-6 py-3 bg-[rgba(224,99,99,0.85)] text-white rounded-xl font-semibold font-parastoo hover:bg-[rgba(224,99,99,0.95)] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  </BaseModal>
);

// Success Modal (for confirmations)
export const SuccessModal = ({ isOpen, onClose, title, message, actionText = "Continue", onAction }) => (
  <BaseModal isOpen={isOpen} onClose={onClose}>
    <div className="p-8 text-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Success icon */}
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-3">
        {title || "Success!"}
      </h3>
      <p className="text-[rgba(79,79,79,0.6)] font-parastoo mb-6">
        {message}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onClose}
          className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold font-parastoo hover:bg-gray-50 transition-all duration-200"
        >
          Close
        </button>
        {onAction && (
          <button
            onClick={() => {
              onAction();
              onClose();
            }}
            className="px-6 py-3 bg-[rgba(224,99,99,0.85)] text-white rounded-xl font-semibold font-parastoo hover:bg-[rgba(224,99,99,0.95)] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  </BaseModal>
);

// Login Required Modal
export const LoginRequiredModal = ({ isOpen, onClose, onLogin }) => (
  <BaseModal isOpen={isOpen} onClose={onClose}>
    <div className="p-8 text-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Login icon */}
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <LogIn className="w-8 h-8 text-blue-600" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-3">
        Login Required
      </h3>
      <p className="text-[rgba(79,79,79,0.6)] font-parastoo mb-6">
        Please log in to place an order and track your sweet deliveries.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onClose}
          className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold font-parastoo hover:bg-gray-50 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onLogin();
            onClose();
          }}
          className="px-6 py-3 bg-[rgba(224,99,99,0.85)] text-white rounded-xl font-semibold font-parastoo hover:bg-[rgba(224,99,99,0.95)] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" />
          Go to Login
        </button>
      </div>
    </div>
  </BaseModal>
);

// Validation Error Modal
export const ValidationModal = ({ isOpen, onClose, title, message, actionText = "Fix Issues" }) => (
  <BaseModal isOpen={isOpen} onClose={onClose}>
    <div className="p-8 text-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Warning icon */}
      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText className="w-8 h-8 text-orange-600" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-[rgba(79,79,79,0.7)] font-parastoo mb-3">
        {title || "Missing Information"}
      </h3>
      <p className="text-[rgba(79,79,79,0.6)] font-parastoo mb-6">
        {message || "Please fill out all required fields including delivery date and time."}
      </p>

      {/* Action */}
      <button
        onClick={onClose}
        className="px-8 py-3 bg-[rgba(224,99,99,0.85)] text-white rounded-xl font-semibold font-parastoo hover:bg-[rgba(224,99,99,0.95)] transition-all duration-200 shadow-md hover:shadow-lg"
      >
        {actionText}
      </button>
    </div>
  </BaseModal>
);

// Updated CheckoutPage handlePayment function
export const useCheckoutModals = (navigate) => {
  const [modals, setModals] = React.useState({
    loginRequired: false,
    validation: false,
    error: false,
    errorMessage: "",
  });

  const showLoginModal = () => {
    setModals(prev => ({ ...prev, loginRequired: true }));
  };

  const showValidationModal = () => {
    setModals(prev => ({ ...prev, validation: true }));
  };

  const showErrorModal = (message) => {
    setModals(prev => ({ ...prev, error: true, errorMessage: message }));
  };

  const closeModals = () => {
    setModals({
      loginRequired: false,
      validation: false,
      error: false,
      errorMessage: "",
    });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const ModalComponents = () => (
    <>
      <LoginRequiredModal
        isOpen={modals.loginRequired}
        onClose={closeModals}
        onLogin={handleLogin}
      />
      
      <ValidationModal
        isOpen={modals.validation}
        onClose={closeModals}
        title="Complete Required Fields"
        message="Please fill out all required fields including delivery date and time before proceeding."
      />
      
      <ErrorModal
        isOpen={modals.error}
        onClose={closeModals}
        title="Order Processing Error"
        message={modals.errorMessage || "There was an error processing your order. Please try again."}
        actionText="Try Again"
        onAction={() => {
          // Could add retry logic here if needed
        }}
      />
    </>
  );

  return {
    showLoginModal,
    showValidationModal,
    showErrorModal,
    closeModals,
    ModalComponents,
  };
};