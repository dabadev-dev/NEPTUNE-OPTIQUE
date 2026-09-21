import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Loader2,
  Package,
} from "lucide-react";

import type { Product } from "../data/products";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../services/productService";

interface ProductFormProps {
  productId?: number;
}

export default function ProductForm({
  productId,
}: ProductFormProps) {
  const navigate = useNavigate();

  const isEditing = productId !== undefined;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [shape, setShape] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(isEditing);
  const [error, setError] = useState("");

  // Récupérer le produit lorsqu'on est en mode modification
  useEffect(() => {
    if (!isEditing || productId === undefined) return;

    const loadProduct = async () => {
      try {
        setLoadingProduct(true);
        setError("");

        const product = await getProduct(productId);

        setName(product.name);
        setCategory(product.category);
        setType(product.type);
        setShape(product.shape);
        setPrice(String(product.price));
        setImage(product.image);
        setColor(product.color || "");
        setSize(product.size || "");
      } catch (error) {
        console.error(error);
        setError("Impossible de récupérer le produit.");
      } finally {
        setLoadingProduct(false);
      }
    };

    loadProduct();
  }, [productId, isEditing]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");

    // Validation
    if (
      !name ||
      !category ||
      !type ||
      !shape ||
      !price ||
      !image
    ) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const numericPrice = Number(price);

    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError("Veuillez entrer un prix valide.");
      return;
    }

    try {
      setLoading(true);

      const productData = {
        name,
        category,
        type,
        shape,
        price: numericPrice,
        image,
        color: color || undefined,
        size: size || undefined,
      };

      if (isEditing && productId !== undefined) {
        await updateProduct(productId, productData);
      } else {
        await createProduct(
          productData as Omit<Product, "id">
        );
      }

      navigate("/dashboard/produits");

    } catch (error: any) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Une erreur est survenue lors de l'enregistrement."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="flex min-h-125 items-center justify-center bg-[#f7f8fb]">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2
            size={22}
            className="animate-spin text-[#29438f]"
          />
          Chargement du produit...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fb] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* RETOUR */}
        <Link
          to="/dashboard/produits"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#29438f]"
        >
          <ArrowLeft size={18} />
          Retour aux produits
        </Link>

        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <Package
              size={21}
              className="text-[#29438f]"
            />

            <span className="text-sm font-medium text-[#29438f]">
              Neptune Optique
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {isEditing
              ? "Modifier le produit"
              : "Ajouter un produit"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {isEditing
              ? "Modifiez les informations de ce produit."
              : "Ajoutez un nouveau produit au catalogue Neptune Optique."}
          </p>
        </div>

        {/* ERREUR */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* FORMULAIRE */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 bg-white shadow-sm"
        >

          {/* INFORMATIONS PRINCIPALES */}
          <div className="border-b border-gray-100 p-5 sm:p-7">

            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Informations du produit
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* NOM */}
              <div className="md:col-span-2">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Nom du produit *
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Lunettes Neptune Classic"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#29438f] focus:ring-2 focus:ring-[#29438f]/10"
                />
              </div>

              {/* CATEGORIE */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Catégorie *
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#29438f] focus:ring-2 focus:ring-[#29438f]/10"
                >
                  <option value="">
                    Sélectionner une catégorie
                  </option>
                  <option value="Femmes">Femmes</option>
                  <option value="Hommes">Hommes</option>
                  <option value="Enfants">Enfants</option>
                </select>
              </div>

              {/* TYPE */}
              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Type *
                </label>

                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#29438f] focus:ring-2 focus:ring-[#29438f]/10"
                >
                  <option value="">
                    Sélectionner un type
                  </option>
                  <option value="Optiques">
                    Optiques
                  </option>
                  <option value="Solaires">
                    Solaires
                  </option>
                </select>
              </div>

              {/* FORME */}
              <div>
                <label
                  htmlFor="shape"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Forme *
                </label>

                <select
                  id="shape"
                  value={shape}
                  onChange={(e) => setShape(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#29438f] focus:ring-2 focus:ring-[#29438f]/10"
                >
                  <option value="">
                    Sélectionner une forme
                  </option>
                  <option value="Carrées">Carrées</option>
                  <option value="Ovales">Ovales</option>
                  <option value="Rectangulaires">
                    Rectangulaires
                  </option>
                  <option value="Rondes">Rondes</option>
                </select>
              </div>

              {/* PRIX */}
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Prix (CFA) *
                </label>

                <input
                  id="price"
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ex : 30000"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#29438f] focus:ring-2 focus:ring-[#29438f]/10"
                />
              </div>

              {/* IMAGE */}
              <div className="md:col-span-2">
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Image *
                </label>

                <input
                  id="image"
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Ex : image4.jpg"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#29438f] focus:ring-2 focus:ring-[#29438f]/10"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Entrez le nom ou le chemin de l'image utilisée
                  dans le catalogue.
                </p>
              </div>

            </div>
          </div>

          {/* DETAILS */}
          <div className="p-5 sm:p-7">

            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Détails supplémentaires
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* COULEUR */}
              <div>
                <label
                  htmlFor="color"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Couleur
                </label>

                <input
                  id="color"
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="Ex : Noir"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#29438f] focus:ring-2 focus:ring-[#29438f]/10"
                />
              </div>

              {/* TAILLE */}
              <div>
                <label
                  htmlFor="size"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Taille
                </label>

                <select
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#29438f] focus:ring-2 focus:ring-[#29438f]/10"
                >
                  <option value="">
                    Sélectionner une taille
                  </option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>

            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/50 p-5 sm:flex-row sm:justify-end sm:p-7">

            <Link
              to="/dashboard/produits"
              className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-600 transition hover:border-gray-300"
            >
              Annuler
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#29438f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#203675] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save size={18} />
                  {isEditing
                    ? "Enregistrer les modifications"
                    : "Ajouter le produit"}
                </>
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}