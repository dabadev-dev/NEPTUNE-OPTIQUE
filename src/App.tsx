import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layout/homeLayout";
import Catalogue from "./pages/Catalogue";
import ProductDetailPage from "./pages/product-detail";

import Accueil from "./pages/accueil";
import LunettesSolaires from "./pages/LunettesSolaires";
import LunettesOptiques from "./pages/LunettesOptiques";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Accueil />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/product" element={<ProductDetailPage />} />
          <Route path="/solaires" element={<LunettesSolaires />} />
          <Route path="/optiques" element={<LunettesOptiques />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
