import { useMemo, useState } from "react";
import { ArrowUp } from "lucide-react";

import Filters from "../components/Filters";
import SortBar from "../components/SortBar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

import { products } from "../data/products";

import type { SortOption, ViewMode } from "../components/SortBar";
import { Link } from "react-router-dom";
import CatalogBanner from "../components/CatalogBanner";

export default function Catalogue() {

  // ============================
  // FILTRES
  // ============================

  const [category, setCategory] = useState("");
  const [shape, setShape] = useState("");
  const [type, setType] = useState("");

  const [minPrice, setMinPrice] = useState(25000);
  const [maxPrice, setMaxPrice] = useState(350000);

  // ============================
  // TRI
  // ============================

  const [sort, setSort] = useState<SortOption>("default");

  // ============================
  // AFFICHAGE
  // ============================

  const [viewMode, setViewMode] = useState<ViewMode>("grid3");

  // ============================
  // PAGINATION
  // ============================

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;

  // ============================
  // FILTRAGE
  // ============================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Catégorie
    if (category) {
      result = result.filter((product) => product.category === category);
    }

    // Forme
    if (shape) {
      result = result.filter((product) => product.shape === shape);
    }

    // Type
    if (type) {
      result = result.filter((product) => product.type === type);
    }

    // Prix
    result = result.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );

    return result;
  }, [category, shape, type, minPrice, maxPrice]);

  // ============================
  // TRI
  // ============================

  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;

      default:
        break;
    }

    return result;
  }, [filteredProducts, sort]);

  // ============================
  // PAGINATION
  // ============================

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const displayedProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  // ============================
  // RESET PAGE APRÈS FILTRE
  // ============================

  const handleCategory = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleShape = (value: string) => {
    setShape(value);
    setCurrentPage(1);
  };

  const handleType = (value: string) => {
    setType(value);
    setCurrentPage(1);
  };

  const handleMinPrice = (value: number) => {
    setMinPrice(value);
    setCurrentPage(1);
  };

  const handleMaxPrice = (value: number) => {
    setMaxPrice(value);
    setCurrentPage(1);
  };

  // ============================
  // RETOUR EN HAUT
  // ============================

  const retourEnHaut = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    
    <div className="min-h-screen bg-white">
        <CatalogBanner />

      <main className="mx-auto max-w-7xl px-6 py-14">
        {/* ================= SORT BAR ================= */}

        <SortBar
          sort={sort}
          setSort={(value) => {
            setSort(value);
            setCurrentPage(1);
          }}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* NOMBRE DE PRODUITS */}

        <div className="mb-6 text-right text-gray-600">
          Affichage de {sortedProducts.length === 0 ? 0 : startIndex + 1}–
          {Math.min(startIndex + productsPerPage, sortedProducts.length)} sur{" "}
          {sortedProducts.length} résultats
        </div>

        <div className="flex flex-col gap-10 lg:flex-row">
          {/* ================= FILTERS ================= */}

          <Filters
            category={category}
            shape={shape}
            type={type}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setCategory={handleCategory}
            setShape={handleShape}
            setType={handleType}
            setMinPrice={handleMinPrice}
            setMaxPrice={handleMaxPrice}
            products={products}
          />

          {/* ================= PRODUITS ================= */}

          <section className="flex-1">
            {displayedProducts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg text-gray-600">Aucun produit trouvé.</p>

                <button
                  onClick={() => {
                    setCategory("");
                    setShape("");
                    setType("");
                    setMinPrice(25000);
                    setMaxPrice(350000);
                    setCurrentPage(1);
                  }}
                  className="mt-4 bg-[#29438f] px-5 py-2 text-sm text-white"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div
                className={`
                  grid gap-x-5 gap-y-8
                  ${
                    viewMode === "grid3"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : ""
                  }
                  ${viewMode === "grid2" ? "grid-cols-1 sm:grid-cols-2" : ""}
                  ${viewMode === "list" ? "grid-cols-1" : ""}
                `}
              >
                {displayedProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <ProductCard key={product.id} product={product} />
                  </Link>
                ))}
              </div>
            )}

            {/* ================= PAGINATION ================= */}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </section>
        </div>
      </main>

      {/* RETOUR EN HAUT */}

      <button
        onClick={retourEnHaut}
        className="
          fixed
          bottom-5
          right-5
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-[#29438f]
          bg-white
          text-[#29438f]
          shadow-sm
          transition
          hover:bg-[#29438f]
          hover:text-white
        "
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
