import { Outlet } from "react-router-dom";
import FooterSection from "../components/footerSection";
import Navbar from "../components/Navbar";

export default function HomeLayout() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Outlet */}
      <Outlet />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
