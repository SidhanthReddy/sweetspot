import React, { useState, useEffect, useRef } from 'react';

const BasicInputs = ({ formData, onChange }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);

  const budgetRanges = [
    { value: '500-1000', label: '₹500 - ₹1,000', min: 500, max: 1000 },
    { value: '1000-2000', label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
    { value: '2000-3500', label: '₹2,000 - ₹3,500', min: 2000, max: 3500 },
    { value: '3500-5000', label: '₹3,500 - ₹5,000', min: 3500, max: 5000 },
    { value: '5000-7500', label: '₹5,000 - ₹7,500', min: 5000, max: 7500 },
    { value: '7500-10000', label: '₹7,500 - ₹10,000', min: 7500, max: 10000 },
    { value: '10000+', label: '₹10,000+', min: 10000, max: null }
  ];

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  const todayString = today.toISOString().split('T')[0];

  // Handle click outside calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dateString = currentDate.toISOString().split('T')[0];
      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = dateString === todayString;
      const isSelected = dateString === formData.deliveryDate;
      const currentDateCopy = new Date(currentDate);
      currentDateCopy.setHours(0, 0, 0, 0); // Reset time for accurate comparison
      const isPastDate = currentDateCopy < today;
      
      days.push({
        date: new Date(currentDate),
        dateString,
        day: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
        isPastDate
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const handleDateSelect = (dateString) => {
    const event = {
      target: {
        name: 'deliveryDate',
        value: dateString
      }
    };
    onChange(event);
    setIsCalendarOpen(false);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

      <div className="relative font-parastoo" ref={calendarRef}>
        <label className="block text-sm font-medium text-[rgba(79,79,79,0.66)] mb-3">Delivery Date (Preferred)*</label>
        <div
          className="w-full px-4 py-3 border border-gray-300 bg-white focus-within:border-[rgba(224,99,99,0.85)] text-sm text-gray-700 cursor-pointer flex items-center justify-between"
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        >
          <span className={formData.deliveryDate ? 'text-gray-700' : 'text-gray-400'}>
            {formData.deliveryDate ? formatDate(formData.deliveryDate) : 'Select Date'}
          </span>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        {isCalendarOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-full min-w-[300px] p-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => navigateMonth(-1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-lg font-semibold text-gray-800">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                type="button"
                onClick={() => navigateMonth(1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => !day.isPastDate && handleDateSelect(day.dateString)}
                  disabled={day.isPastDate}
                  className={`
                    p-2 text-sm rounded transition-colors duration-200
                    ${!day.isCurrentMonth 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : day.isPastDate 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : day.isSelected
                          ? 'bg-[rgba(224,99,99,0.85)] text-white font-semibold'
                          : day.isToday
                            ? 'bg-[rgba(224,99,99,0.1)] text-[rgba(224,99,99,0.85)] font-semibold border border-[rgba(224,99,99,0.85)]'
                            : 'text-gray-700 hover:bg-[rgba(224,99,99,0.1)] hover:text-[rgba(224,99,99,0.85)]'
                    }
                  `}
                >
                  {day.day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BasicInputs;