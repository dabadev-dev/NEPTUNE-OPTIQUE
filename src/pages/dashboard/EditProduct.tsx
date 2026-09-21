import { useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm";

export default function EditProduct() {
  const { id } = useParams();

  const productId = Number(id);

  if (isNaN(productId)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fb]">
        <p className="text-red-600">
          Identifiant du produit invalide.
        </p>
      </div>
    );
  }

  return <ProductForm productId={productId} />;
}