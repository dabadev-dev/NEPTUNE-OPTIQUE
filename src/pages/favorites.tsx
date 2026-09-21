import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import CatalogBanner from "../components/CatalogBanner";
import type { Product } from "../data/products";
import {
  getFavorites,
  removeFavorite,
} from "../services/favoriteService";

interface Favorite {
  id: number;
  productId: number;
  product: Product;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error("Erreur chargement favoris :", error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (productId: number) => {
    try {
      await removeFavorite(productId);
      setFavorites((prev) =>
        prev.filter((favorite) => favorite.productId !== productId),
      );
    } catch (error) {
      console.error("Erreur suppression favori :", error);
    }
  };

  return (
    <section className="min-h-screen bg-white">
      <CatalogBanner />

      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-16 lg:px-8">
        {favorites.length === 0 ? (
          <p className="text-gray-500">
            Aucun favori pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {favorites.map((favorite) => {
              const product = favorite.product;

              return (
                <article
                  key={favorite.id}
                  className="relative"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#f5f5f3]">
                    <img
                      src={`http://localhost:3000/${product.image}`}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(product.id)
                      }
                      className="absolute right-4 top-4"
                    >
                      <Heart
                        size={20}
                        fill="#263f87"
                        className="text-[#263f87]"
                      />
                    </button>
                  </div>

                  <div className="pt-4 text-center">
                    <h2 className="text-sm font-medium md:text-base">
                      {product.name}
                    </h2>

                    <p className="mt-2 text-sm">
                      {Number(product.price).toLocaleString("fr-FR")} CFA
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}