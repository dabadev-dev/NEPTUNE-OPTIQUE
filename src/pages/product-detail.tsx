import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import ProductTabs from "../components/ProductTabs";
import { products } from "../data/products";
import RelatedProducts from "../components/RelatedProducts";
import CatalogBanner from "../components/CatalogBanner";

function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <p className="px-6 py-20 text-center">Produit introuvable.</p>;
  }

  const relatedProducts = products.filter((item) => item.id !== product.id);

  return (
    <>
          <CatalogBanner
  productName={product.name}
  productType={product.type}
/>

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

export default ProductDetailPage;