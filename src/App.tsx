import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeLayout from "./layout/homeLayout";

import Accueil from "./pages/accueil";
import Catalogue from "./pages/Catalogue";
import ProductDetailPage from "./pages/product-detail";
import Favorites from "./pages/favorites";
import LunettesSolaires from "./pages/LunettesSolaires";
import LunettesOptiques from "./pages/LunettesOptiques";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Panier from "./pages/Panier";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages du site */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Accueil />} />
          <Route path="favoris" element={<Favorites />} />
          <Route path="catalogue" element={<Catalogue />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="solaires" element={<LunettesSolaires />} />
          <Route path="optiques" element={<LunettesOptiques />} />
          <Route path="panier" element={<Panier />} />
        </Route>

        {/* Authentification */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
