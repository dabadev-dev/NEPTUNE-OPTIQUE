
import { useEffect, useState } from "react";
import {
  getFavorites,
  toggleFavorite,
  type Product,
} from "../utils/favorites";
import { Heart } from "lucide-react";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  useEffect(() => {
    // Charger les favoris au démarrage
    loadFavorites();

    // Écouter les changements
    window.addEventListener(
      "favoritesUpdated",
      loadFavorites
    );

    return () => {
      window.removeEventListener(
        "favoritesUpdated",
        loadFavorites
      );
    };
  }, []);

  const removeFavorite = (product: Product) => {
    toggleFavorite(product);
  };

  return (
    <section className="mx-auto max-w-300 px-4 py-10">

      <h1 className="mb-8 text-3xl font-bold">
        Mes favoris
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">
          Aucun favori pour le moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {favorites.map((product) => (
            <article
              key={product.id}
              className="relative"
            >

              <div className="relative aspect-square overflow-hidden bg-[#f5f5f3]">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeFavorite(product)}
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
                  {product.price.toLocaleString("fr-FR")} CFA
                </p>
              </div>

            </article>
          ))}

        </div>
      )}

    </section>
  );
}
