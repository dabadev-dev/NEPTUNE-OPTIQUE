import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layout/homeLayout";
import Catalogue from "./pages/Catalogue";
import ProductDetailPage from "./pages/product-detail";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/product" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
