import { useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({
  products,
}: RelatedProductsProps) {
  const [startIndex, setStartIndex] = useState(0);

  const visibleProducts = products.slice(
    startIndex,
    startIndex + 4
  );

  const nextProducts = () => {
    if (startIndex + 4 < products.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const previousProducts = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="mx-auto max-w-300 px-4 pb-16 md:px-6">

      {/* =========================
          TITRE
      ========================== */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-serif text-2xl uppercase text-[#171717] md:text-3xl">
          Related Products
        </h2>

        {/* Navigation */}
        {products.length > 4 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={previousProducts}
              disabled={startIndex === 0}
              className="
                flex h-9 w-9 items-center justify-center
                border border-gray-300
                text-gray-700
                transition
                hover:border-[#263f87]
                hover:text-[#263f87]
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={nextProducts}
              disabled={startIndex + 4 >= products.length}
              className="
                flex h-9 w-9 items-center justify-center
                border border-gray-300
                text-gray-700
                transition
                hover:border-[#263f87]
                hover:text-[#263f87]
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* =========================
          PRODUITS
      ========================== */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {visibleProducts.map((product) => (
          <article
            key={product.id}
            className="group"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-[#f5f5f3]">

              <img
                src={product.image}
                alt={product.name}
                className="
                  h-full w-full
                  object-cover
                  transition duration-500
                  group-hover:scale-105
                "
              />

              {/* Favoris */}
              <button
                type="button"
                className="
                  absolute right-4 top-4
                  flex h-8 w-8
                  items-center justify-center
                  text-gray-700
                  transition
                  hover:text-[#263f87]
                "
                title="Ajouter aux favoris"
              >
                <Heart
                  size={19}
                  strokeWidth={1.5}
                />
              </button>

            </div>

            {/* Informations */}
            <div className="pt-4 text-center">

              <h3 className="text-sm font-medium text-gray-800 md:text-base">
                {product.name}
              </h3>

              <p className="mt-2 text-sm text-gray-700 md:text-base">
                {product.price.toLocaleString("fr-FR")} CFA
              </p>

            </div>
          </article>
        ))}

      </div>
    </section>
  );
}