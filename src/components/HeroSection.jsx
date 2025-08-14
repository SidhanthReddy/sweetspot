import { useState, useEffect } from 'react';

const HeroSection = ({ onTrack }) => {
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId.trim() || !/^[a-zA-Z0-9-]{6,}$/.test(orderId)) {
      setError('Invalid Order ID. Please enter a valid ID or contact support.');
      onTrack(null);
    } else {
      setError('');
      onTrack(orderId); // Notify App.jsx
    }
  };

  useEffect(() => {
    if (orderId && !/^[a-zA-Z0-9-]{6,}$/.test(orderId)) {
      setError('Order ID must be at least 6 characters and can include hyphens.');
    } else {
      setError('');
    }
  }, [orderId]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden min-h-[500px] flex items-center font-parastoo"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 animate-zoomSlowly"
        style={{
          backgroundImage: `url('/images/cake-delivery.png')`,
        }}
      />
      <div className="absolute inset-0 hero-pattern" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <h1
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-sweetspot-main to-sweetspot-alt3 bg-clip-text text-transparent mb-6 animate-fade-in-1"
        >
          SweetSpot Delivery Tracking
        </h1>

        <p className="text-lg sm:text-xl text-sweetspot-text max-w-3xl mx-auto leading-relaxed animate-fade-in-2">
          Track your delicious cake orders in real-time. From our kitchen to your doorstep, every sweet moment is perfectly timed.
        </p>

        <p className="italic text-smallQuote text-sweetspot-text mt-6 animate-fade-in-3">
          "Every cake has a story. Let’s deliver yours with care."
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 max-w-md mx-auto flex flex-col gap-3 items-center animate-fade-in-4 w-full"
          aria-label="Order Tracking Form"
        >
          <div className="flex flex-col sm:flex-row w-full gap-2">
            <input
              id="order-id"
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID"
              aria-label="Enter Order ID"
              className="w-full px-4 py-3 rounded-lg border border-sweetspot-alt2 focus:ring-2 focus:ring-sweetspot-main"
            />
            <button
              type="submit"
              className="sweet-button px-5 rounded-lg whitespace-nowrap"
              aria-label="Track Order"
            >
              Track
            </button>
          </div>
          {error && (
            <p className="text-red-600 text-sm mt-1 font-medium" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
