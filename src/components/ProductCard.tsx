import { Link } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  oldPrice?: number;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product, 
}: ProductCardProps) {
  return (
    <article className="group">

      {/* IMAGE */}
      <Link to={`/produit/${product.id}`}>
        <div
          className="
            relative
            aspect-square
            overflow-hidden
            rounded-sm
            bg-[#f7f7f7]
          "
        >
          {/* Badge */}
          {product.badge && (
            <span
              className="
                absolute
                left-3
                top-3
                z-10
                bg-[#29438f]
                px-3
                py-1
                text-xs
                font-medium
                text-white
              "
            >
              {product.badge}
            </span>
          )}

          <img
            src={product.image}
            alt={product.name}
            className="
              h-full
              w-full
              object-contain
              p-8
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

          {/* Overlay */}
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              translate-y-full
              bg-black/70
              px-4
              py-3
              text-center
              transition-transform
              duration-300
              group-hover:translate-y-0
            "
          >
            <span className="text-sm font-medium text-white">
              Voir le produit
            </span>
          </div>
        </div>
      </Link>

      {/* INFORMATIONS */}
      <div className="pt-4">

        {product.category && (
          <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">
            {product.category}
          </p>
        )}

        <Link to={`/produit/${product.id}`}>
          <h2
            className="
              text-[15px]
              font-medium
              text-gray-800
              transition-colors
              duration-200
              hover:text-[#29438f]
            "
          >
            {product.name}
          </h2>
        </Link>

        <div className="mt-2 flex items-center gap-2">

          <span className="text-[15px] font-semibold text-gray-900">
            {product.price.toLocaleString("fr-FR")} CFA
          </span>

          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.oldPrice.toLocaleString("fr-FR")} CFA
            </span>
          )}

        </div>

      </div>
    </article>
  );
}