import { SlArrowRight } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";

interface CatalogBannerProps {
  productName?: string;
  productType?: "Optiques" | "Solaires";
}

export default function CatalogBanner({
  productName,
  productType,
}: CatalogBannerProps) {
  const location = useLocation();
  const path = location.pathname;

  // =========================
  // PAGE PRODUIT
  // =========================
  if (path.startsWith("/product/")) {
    const type = productType || "Optiques";

    const typeLabel =
      type === "Solaires"
        ? "LUNETTES SOLAIRES"
        : "LUNETTES OPTIQUES";

    const typeLink =
      type === "Solaires"
        ? "/solaires"
        : "/optiques";

    return (
      <section className="relative h-70 overflow-hidden">

        <img
          src="/images/catalogue-banner.png"
          alt="Catalogue Neptune Optique"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* VOILE BLANC LÉGER */}
        <div className="absolute inset-0 bg-white/20" />

        {/* CONTENU */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">

          {/* NOM DU PRODUIT */}
          <h1 className="font-serif text-4xl font-bold text-black">
            { "Product"}
          </h1>

          {/* BREADCRUMB */}
          <div className="mt-3 flex flex-wrap items-center gap-3">

            <Link
              to="/"
              className="text-[#29438f] hover:underline"
            >
              ACCUEIL
            </Link>

            <SlArrowRight size={14} />

            <Link
              to={typeLink}
              className="text-[#29438f] hover:underline"
            >
              {typeLabel}
            </Link>

            <SlArrowRight size={14} />

            <span className="font-semibold">
              {productName?.toUpperCase()}
            </span>

          </div>

        </div>

      </section>
    );
  }

  // =========================
  // PAGE CATALOGUE
  // =========================
  let currentPage = "CATALOGUE";

  if (path === "/optiques") {
    currentPage = "LUNETTES OPTIQUES";
  }

  if (path === "/solaires") {
    currentPage = "LUNETTES SOLAIRES";
  }

  return (
    <section className="relative h-70 overflow-hidden">

      <img
        src="/images/catalogue-banner.png"
        alt="Catalogue Neptune Optique"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* VOILE BLANC LÉGER */}
      <div className="absolute inset-0 bg-white/20" />

      {/* CONTENU */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">

        <h1 className="font-serif text-4xl font-bold text-black">
          {currentPage}
        </h1>

        <div className="mt-3 flex items-center gap-3">

          <Link
            to="/"
            className="text-[#29438f] hover:underline"
          >
            ACCUEIL
          </Link>

          <SlArrowRight size={14} />

          <span className="font-semibold">
            {currentPage}
          </span>

        </div>

      </div>

    </section>
  );
}

