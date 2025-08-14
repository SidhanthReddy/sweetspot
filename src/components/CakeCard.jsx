import React from "react";
import { Heart, Star } from "lucide-react";
import { useWishlist } from "../components/WishlistContext";
import { useToast } from "../components/CustomToast";

const CakeCard = ({
  cake,
  onCardClick,
  onOpenModal, // New prop for opening modal
  isWishlistPage = false,
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const showToast = useToast();

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Heart clicked for:", cake.name);
    toggleWishlist(cake);
    const wishlisted = isInWishlist(cake.id);
    showToast.info(
      !wishlisted ? "❤️ Added to Wishlist" : "💔 Removed from Wishlist",
      1000
    );
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    onOpenModal?.(cake);
  };

  const isWishlisted = isInWishlist(cake.id);

  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer"
      onClick={() => onCardClick?.(cake)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={cake.imageURL}
          alt={cake.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={handleWishlistClick}
        >
          <button
            className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
            onClick={handleWishlistClick}
          >
            <Heart
              className="h-4 w-4"
              style={{
                color: isWishlisted
                  ? "rgba(224, 99, 99, 0.85)"
                  : "rgba(224, 99, 99, 0.4)",
                fill: isWishlisted ? "rgba(224, 99, 99, 0.85)" : "none",
              }}
            />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-white text-xs px-3 py-1 rounded-full font-parastoo bg-black bg-opacity-50">
            {cake.deliveryTime}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3
          className="font-semibold text-lg font-parastoo mb-2 line-clamp-2"
          style={{ color: "rgba(79,79,79,0.7)" }}
        >
          {cake.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < cake.rating ? "fill-current" : ""}`}
                style={{ color: "rgba(224, 99, 99, 0.85)" }}
              />
            ))}
          </div>
          <span
            className="text-sm font-parastoo"
            style={{ color: "rgba(79,79,79,0.5)" }}
          >
            ({cake.rating})
          </span>
        </div>

        <p
          className="text-sm mb-4 line-clamp-2 font-parastoo"
          style={{ color: "rgba(79,79,79,0.7)" }}
        >
          {cake.description}
        </p>

        {/* Price & Details Button */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xl font-bold font-parastoo"
            style={{ color: "rgba(224, 99, 99, 0.85)" }}
          >
            ₹{cake.price}
          </span>

          <button
            onClick={handleDetailsClick}
            className="text-white font-parastoo py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            style={{ backgroundColor: "rgba(224, 99, 99, 0.85)" }}
          >
            Details
          </button>
        </div>

        <div
          className="text-xs font-parastoo mt-3"
          style={{ color: "rgba(79,79,79,0.5)" }}
        >
          ✓ Fresh baked
        </div>
      </div>
    </div>
  );
};

export default CakeCard;
