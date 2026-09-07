import { Heart } from "lucide-react"
import type { Product } from "../data/products"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({
  product,
}: ProductCardProps) {

  return (
    <div className="group">

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
          className="
            absolute
            right-3
            top-3
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
            className="text-gray-600"
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

    </div>
  )
}