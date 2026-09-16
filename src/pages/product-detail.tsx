import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductDetail from "../components/ProductDetail";
import ProductTabs from "../components/ProductTabs";
import RelatedProducts from "../components/RelatedProducts";
import CatalogBanner from "../components/CatalogBanner";

import type { Product } from "../data/products";
import { getProducts } from "../services/productService";

function ProductDetailPage() {
  const { id } = useParams();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error(
          "Erreur lors du chargement des produits :",
          error
        );
      });
  }, []);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <p className="px-6 py-20 text-center">
        Produit introuvable.
      </p>
    );
  }

  const relatedProducts = products.filter(
    (item) => item.id !== product.id
  );

  return (
    <>
      <CatalogBanner />

      <ProductDetail product={product} />

      <ProductTabs
        description="Lunette de soleil pour homme – Modification Cira"
        reviewsCount={0}
        additionalInfo={[
          {
            label: "Type",
            value: product.type,
          },
          {
            label: "Genre",
            value: product.category,
          },
          {
            label: "Couleur",
            value: product.color || "Non précisée",
          },
          {
            label: "Forme",
            value: product.shape,
          },
        ]}
      />

      <RelatedProducts products={relatedProducts} />
    </>
  );
}

export default ProductDetailPage;