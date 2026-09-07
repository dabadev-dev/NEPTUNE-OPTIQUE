import { Outlet } from "react-router-dom";
import FooterSection from "../components/footerSection";
import Navbar from "../components/Navbar";
import { ArrowUp } from "lucide-react";
import CatalogBanner from "../components/CatalogBanner";

export default function HomeLayout() {

  const retourEnHaut = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <CatalogBanner />

      {/* Outlet */}
      <Outlet />

      {/* Footer */}
      <FooterSection />
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
