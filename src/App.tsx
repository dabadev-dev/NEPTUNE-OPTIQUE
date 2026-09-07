import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import HomeLayout from "./layout/homeLayout";
import Catalogue from "./pages/Catalogue";
import ProductDetail from "./components/ProductDetail";
import { products } from "./data/products";
import ProductTabs from "./components/ProductTabs";
import RelatedProducts from "./components/RelatedProducts";

function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <p className="px-6 py-20 text-center">Produit introuvable.</p>;
  }

  const relatedProducts = products.filter((item) => item.id !== product.id);

  return (
    <>
      <ProductDetail product={product} />
      <ProductTabs
        description="Lunette de soleil pour homme – Modification Cira"
        reviewsCount={0}
        additionalInfo={[
          {
        label: "Type",
        value: "Lunettes de soleil",
      },
      {
        label: "Genre",
        value: "Homme",
      },
      {
        label: "Couleur",
        value: "Noir",
      },
      {
        label: "Matière",
        value: "Acétate",
      },
    ]}
  />
      <RelatedProducts products={relatedProducts} />
  </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
