import { Heart, Menu, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const message = `
    PROFITEZ DE NOS LUNETTES DE SOLEIL À PARTIR DE 10000 FRS SEULEMENT.
    PROTÉGEZ VOS YEUX AVEC STYLE ET À PETIT PRIX
    — LE DÉPISTAGE VISUEL EST TOTALEMENT GRATUIT EXCLUSIVEMENT AU SEIN DE NOTRE BOUTIQUE DE KEUR MASSAR (EN FACE DE SEDIMA)
    — PENDANT LES VACANCES, PROFITEZ DE NOS OFFRES EXCLUSIVES
  `;
  return (
    <header>
      <div className="text-gray-900 flex justify-between items-center py-8 px-4 md:px-24">
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" className="w-40" />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex font-medium space-x-8">
            <li>
              <Link to="/" className="hover:text-yellow-600 font-serif">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/catalogue" className="hover:text-yellow-600 font-serif">
                Catalogue
              </Link>
            </li>
            <li>
              <Link to="/solaires" className="hover:text-yellow-600 font-serif">
                Solaires
              </Link>
            </li>
            <li>
              <Link to="/optiques" className="hover:text-yellow-600 font-serif">
                Optiques
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex  space-x-4">
          {/* Favoris */}
          <Link to="/favoris">
            <Heart size={24} strokeWidth={1.8} />
          </Link>

          {/* Panier */}
          <Link to="/panier" className="relative">
            <ShoppingBag size={24} strokeWidth={1.8} />
           <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#29438f] text-[9px] text-white">
              0
            </span>
          </Link>
        </div>
        <div className="md:hidden">
          <Menu size={24} strokeWidth={1.8} />
        </div>
      </div>
      <div className="w-full py-2 overflow-hidden bg-blue-900 text-white">
        <div className="flex w-max animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          <span className="mx-10">{message}</span>
          <span className="mx-10">{message}</span>
        </div>
      </div>
    </header>
  );
}
