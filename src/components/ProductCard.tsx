import { Heart } from "lucide-react";
import type { Product } from "../data/products";
import { useState } from "react";
import { getFavorites, toggleFavorite } from "../utils/favorites";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [favorites, setFavorites] = useState(getFavorites());

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const updated = toggleFavorite(product);
    setFavorites(updated);
  };

  const isFavorite = favorites.some(
    (item) => item.id === product.id
  );

  return (
    <article className="group">

      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">

        <img
          src={product.image}
          alt={product.name}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-105
          "
        />

        {/* FAVORI */}
        <button
          type="button"
          onClick={handleFavorite}
          className="
            absolute
            right-3
            top-3
            z-10
            rounded-full
            bg-white/80
            p-1.5
            transition
            hover:bg-white
          "
        >
          <Heart
            size={17}
            strokeWidth={1.5}
            className="text-[#263f87]"
            fill={isFavorite ? "#263f87" : "none"}
          />
        </button>

      </div>

      {/* INFOS */}
      <div className="py-3 text-center">
        <h3 className="text-sm text-gray-800">
          {product.name}
        </h3>

        <p className="mt-1 text-xs text-gray-700">
          {product.price.toLocaleString("fr-FR")} CFA
        </p>
      </div>

    </article>
  );
}