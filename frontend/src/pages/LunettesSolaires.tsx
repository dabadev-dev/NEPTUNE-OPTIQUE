import { useEffect, useState } from "react";

import CatalogBanner from "../components/CatalogBanner";
import ProductGrid from "../components/ProductGrid";

import type { Product } from "../data/products";
import { getProducts } from "../services/productService";

export default function LunettesSolaires() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error(
          "Erreur lors du chargement des produits :",
          error
        );
      });
  }, []);

  const solarGlasses = products.filter(
    (product) => product.type === "Solaires"
  );

  return (
    <main className="min-h-screen bg-white">
      <CatalogBanner />

      <section className="px-5 py-12 md:px-8 md:py-16 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl">
          <ProductGrid products={solarGlasses} />
        </div>
      </section>
    </main>
  );
}