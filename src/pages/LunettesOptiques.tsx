import CatalogBanner from "../components/CatalogBanner";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";

export default function LunettesOptiques() {
  const optiqueGlasses = products.filter(
    (product) => product.type === "Optiques",
  );
  return (
    <main className="min-h-screen bg-white">
      <CatalogBanner />

      {/* ================= CATALOGUE ================= */}
      <section
        className="
          px-5
          py-12
          md:px-8
          md:py-16
          lg:px-12
          xl:px-16
        "
      >
        <div className="mx-auto max-w-7xl">
          {/* TITRE */}

          {/* PRODUITS */}
          <ProductGrid products={optiqueGlasses} />
        </div>
      </section>
    </main>
  );
}
