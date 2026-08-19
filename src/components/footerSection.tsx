import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { BsEnvelope, BsTelephone } from "react-icons/bs";

export default function FooterSection() {
  return (
    <footer>
        <hr className="border-2 border-black" />
      <div className="bg-blue-900 text-white py-12 px-4"></div>
      <div className=" text-gray-900 py-12 px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/">
              <img
                src="images/logo.png"
                alt="Logo"
                className="w-full max-w-xs"
              />
            </Link>
            <h1 className="text-blue-900 font-medium ">
              Confiez votre vision à un professionnel
            </h1>
            <div className="flex space-x-4 mt-4 text-gray-900">
              <FaFacebook size={24} />
              <FaInstagram size={24} />
              <FaTiktok size={24} />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-medium text-xl mb-4">Nous Contacter</h2>
            <p className="flex items-center font-medium">
              <BsTelephone size={24} className="mr-2 text-blue-900" /> +33 1 23
              45 67 89
            </p>
            <p>Lundi - Vendredi: 9h - 18h</p>
            <p>Samedi: 9h 30 - 14h</p>
            <hr className="border-gray-300" />
            <p className="flex items-center font-medium">
              <BsEnvelope size={24} className="mr-2 text-blue-900" />{" "}
              neptune@neptuneoptique.sn
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="font-medium text-xl mb-4">À Propos De Nous</h2>
            <Link to="/a-propos" className="block hover:text-yellow-600">
              A Propos de Neptune
            </Link>
            <Link to="/contact" className="block hover:text-yellow-600">
              Nos Adresses
            </Link>
          </div>
          <div className="space-y-4">
            <h2 className="font-medium text-xl mb-4">Plus d'Informations</h2>
            <Link to="/faqs" className="block hover:text-yellow-600">
              FAQs
            </Link>
            <Link to="/nos-services" className="block hover:text-yellow-600">
              Nos Services
            </Link>
            <Link
              to="/politique-de-retour-et-de-remboursement"
              className="block hover:text-yellow-600"
            >
              Politique de Retour et de Remboursement
            </Link>
            <Link
              to="/politique-de-confidentialite"
              className="block hover:text-yellow-600"
            >
              Politique de Confidentialité
            </Link>
          </div>
        </div>
        <hr className="border-gray-300 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            &copy; Copyright 2026. My Company. Designed by{" "}
            <span className="hover:text-yellow-500">Xarala.co</span>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img src="images/image1.png" alt="PayPal" className="w-80" />
          </div>
        </div>
      </div>
    </footer>
  );
}
