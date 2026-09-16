import type { Product } from "../data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-x-5
        gap-y-12
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id} 
          product={product}
        />
      ))}
    </div>
  );
}