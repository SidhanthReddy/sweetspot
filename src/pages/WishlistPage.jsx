import React, { useState } from "react";
import { useWishlist } from "../components/WishlistContext";
import { useCart } from "../components/CartContext";
import { useToast } from "../components/CustomToast";
import CakeCard from "../components/CakeCard";
import CakeModal from "../components/CakeModal";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NavBar from "../components/NavBar";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart();
  const showToast = useToast();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCake, setSelectedCake] = useState(null);

  const handleAddToCart = (cake) => {
    addToCart({
      ...cake,
      quantity: 1,
      selectedWeight: cake.availableWeights[0] || 1,
      eggOption: cake.eggOptions[0] || 'Egg',
      messageOnCake: ''
    });
    showToast.success("🎂 Added to Cart!", 1000);
  };

  const handleCardClick = (cake) => {
    setSelectedCake(cake);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCake(null);
  };

  const handleGoBack = () => {
    navigate(-1);
  };
    
  return (
    <div className="min-h-screen bg-soft-pink">
      <NavBar />
      <div className="p-6 mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={handleGoBack}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors mr-4"
            style={{ color: 'rgba(79,79,79,0.7)' }}
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-4xl font-bold font-parastoo flex-grow text-center pr-16" style={{ color: 'rgba(79,79,79,0.7)' }}>
            My Wishlist
          </h2>
        </div>
        <hr className="mb-8 border-t-2 border-gray-200" />

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-xl font-parastoo mb-4">No cakes added to wishlist yet.</p>
            <p className="text-gray-400 font-parastoo">Start adding your favorite cakes!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((cake) => (
              <CakeCard
                key={cake.id}
                cake={cake}
                onCardClick={handleCardClick}
                onAddToCart={handleAddToCart}
                isWishlistPage={true} // ✅ set flag to avoid +/- here
              />
            ))}
          </div>
        )}

        {selectedCake && (
          <CakeModal
            cake={selectedCake}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default WishlistPage;