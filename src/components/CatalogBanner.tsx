
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function CatalogBanner() {
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
          Catalogue
        </h1>

        <div className="mt-3 flex items-center gap-3">

          <Link to="/" className="text-[#29438f]">
            ACCUEIL
          </Link>

          <SlArrowRight/>

          <span className="font-semibold">
            CATALOGUE
          </span>

        </div>

      </div>

    </section>
  )
}