import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "../data/products";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../services/favoriteService";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
const [isFavorite, setIsFavorite] = useState(false);

useEffect(() => {
  const loadFavorite = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) return;

    try {
      const favorites = await getFavorites();

      const exists = favorites.some(
        (favorite: any) => favorite.productId === product.id
      );

      setIsFavorite(exists);
    } catch (error) {
      console.error("Erreur favoris :", error);
    }
  };

  loadFavorite();
}, [product.id]);
  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Connectez-vous pour ajouter un favori");
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(product.id);
        setIsFavorite(false);
      } else {
        await addFavorite(product.id);
        setIsFavorite(true);
      }
   } catch (error: any) {
  if (error.response?.status === 409) {
    setIsFavorite(true);
    return;
  }

  console.error("Erreur favori :", error);
}
  };

  return (
    <article className="group">
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={`http://localhost:3000/${product.image}`}
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