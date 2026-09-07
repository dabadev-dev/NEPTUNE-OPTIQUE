import CatalogBanner from "../components/CatalogBanner";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";

export default function LunettesOptiques() {
const optiqueGlasses = products.filter((product)=> product.type === "Optiques")
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
          <div className="mb-10">
            <h1
              className="
                text-3xl
                font-semibold
                text-gray-900
                md:text-4xl
              "
            >
              Lunettes Optiques
            </h1>

            <div className="mt-3 h-0.5 w-12 bg-[#29438f]" />
          </div>

          {/* PRODUITS */}
          <ProductGrid products={optiqueGlasses} />

        </div>
      </section>

    </main>
  );
}