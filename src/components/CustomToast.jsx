// src/components/CustomToast.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 1000) => { // Default duration 1000ms (1 second)
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const toast = {
    info: (message, duration) => showToast(message, 'info', duration),
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {ReactDOM.createPortal(
        <div className="fixed top-5 right-5 z-[1000] space-y-3">
          {toasts.map((t) => (
            <ToastItem key={t.id} message={t.message} type={t.type} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

const ToastItem = ({ message, type }) => {
  // All toasts will now use the pink color scheme
  const borderColor = 'border-pink-600';
  const textColor = 'text-pink-900';
  const bgColor = 'bg-white'; // Background remains white

  return (
    <div
      className={`relative p-4 rounded-lg shadow-lg flex items-center space-x-3 transition-all duration-300 transform translate-x-0 opacity-100 ${bgColor} border-l-8 ${borderColor}`}
      style={{ minWidth: '250px' }}
    >
      <div className="flex-1">
        <p className={`font-parastoo text-lg ${textColor}`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export const useToast = () => useContext(ToastContext);