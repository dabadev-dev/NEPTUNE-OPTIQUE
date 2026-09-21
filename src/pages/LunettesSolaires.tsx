// import { useEffect, useState } from "react";

// import CatalogBanner from "../components/CatalogBanner";
// import ProductGrid from "../components/ProductGrid";

// import type { Product } from "../data/products";
// import { getProducts } from "../services/productService";

// export default function LunettesSolaires() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     getProducts()
//       .then((data) => setProducts(data))
//       .catch((error) => {
//         console.error(
//           "Erreur lors du chargement des produits :",
//           error
//         );
//       });
//   }, []);

//   const solarGlasses = products.filter(
//     (product) => product.type === "Solaires"
//   );

//   return (
//     <main className="min-h-screen bg-white">
//       <CatalogBanner />

//       <section className="px-5 py-12 md:px-8 md:py-16 lg:px-12 xl:px-16">
//         <div className="mx-auto max-w-7xl">
//           <ProductGrid products={solarGlasses} />
//         </div>
//       </section>
//     </main>
//   );
// }

import { useEffect, useState } from "react";

import CatalogBanner from "../components/CatalogBanner";
import ProductGrid from "../components/ProductGrid";

import type { Product } from "../data/products";
import { getProducts } from "../services/productService";

export default function LunettesSolaires() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        console.log("PRODUITS BACKEND :", data);


console.log(
  "TYPES :",
  data.map((product) => ({
    nom: product.name,
    type: product.type,
  }))
);

        setProducts(data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des produits :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const solarGlasses = products.filter(
  (product) =>
    product.category?.toLowerCase() === "lunettes solaires" ||
    product.type?.toLowerCase() === "solaires"
);

  return (
    <main className="min-h-screen bg-white">
      <CatalogBanner />

      <section className="px-5 py-12 md:px-8 md:py-16 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <p className="text-center text-gray-500">
              Chargement des produits...
            </p>
          ) : solarGlasses.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucune lunette solaire disponible.
            </p>
          ) : (
            <ProductGrid products={solarGlasses} />
          )}
        </div>
      </section>
    </main>
  );
}