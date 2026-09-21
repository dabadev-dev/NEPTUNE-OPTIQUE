import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeLayout from "./layout/homeLayout";
import DashboardLayout from "./layout/DashboardLayout";

import Accueil from "./pages/accueil";
import Catalogue from "./pages/Catalogue";
import ProductDetailPage from "./pages/product-detail";
import LunettesSolaires from "./pages/LunettesSolaires";
import LunettesOptiques from "./pages/LunettesOptiques";
import Favorites from "./pages/favorites";

import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/dashboard/Products";
import AddProduct from "./pages/dashboard/AddProduct";
import EditProduct from "./pages/dashboard/EditProduct";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Panier from "./pages/Panier";
import MesCommandes from "./pages/MesCommandes";
import AdminCommandes from "./pages/AdminCommandes";
import AdminRoute from "./components/AdminRoute";
import FinaliserAchat from "./pages/FinaliserAchat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================================
            SITE PUBLIC
        ======================================== */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Accueil />} />
          <Route path="favoris" element={<Favorites />} />
          <Route path="panier" element={<Panier />} />
          <Route path="catalogue" element={<Catalogue />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="product" element={<ProductDetailPage />} />
          <Route path="solaires" element={<LunettesSolaires />} />
          <Route path="optiques" element={<LunettesOptiques />} />
            <Route path="panier" element={<Panier />} />
          <Route path="/mes-commandes" element={<MesCommandes />} />
          
          <Route path="/finaliser-achat" element={<FinaliserAchat />} />
        </Route>
        {/* ========================================
            AUTHENTIFICATION
        ======================================== */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* ========================================
            DASHBOARD
        ======================================== */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="produits" element={<Products />} />
          <Route path="produits/ajouter" element={<AddProduct />} />
          <Route path="produits/modifier/:id" element={<EditProduct />} />
          <Route path="commandes" element={ <AdminCommandes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
