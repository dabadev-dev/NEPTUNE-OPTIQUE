import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  ExternalLink,
  Eye,
  Pencil,
  Trash2,
  Package,
  Loader2,
} from "lucide-react";

import type { Product } from "../../data/products";
import { deleteProduct, getProducts } from "../../services/productService";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      setError("Impossible de récupérer les produits.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer "${name}" ?`,
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteProduct(id);

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id),
      );
    } catch (error) {
      console.error(error);
      alert("Impossible de supprimer le produit.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fb] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Package size={21} className="text-[#29438f]" />

              <span className="text-sm font-medium text-[#29438f]">
                Neptune Optique
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Gestion des produits
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Gérez les produits disponibles dans votre catalogue.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* CATALOGUE */}
            <Link
              to="/catalogue"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:border-[#29438f] hover:text-[#29438f]"
            >
              <ExternalLink size={18} />
              Voir le catalogue
            </Link>

            {/* AJOUTER */}
            <Link
              to="/dashboard/produits/ajouter"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#29438f] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#203675]"
            >
              <Plus size={18} />
              Ajouter un produit
            </Link>
          </div>
        </div>

        {/* ERREUR */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* STATISTIQUE */}
        <div className="mb-6">
          <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:w-80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total produits</p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {products.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#29438f]/10">
                <Package size={22} className="text-[#29438f]" />
              </div>
            </div>
          </div>
        </div>

        {/* TABLEAU */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Tous les produits
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Consultez et gérez les produits de Neptune Optique.
            </p>
          </div>

          {/* CHARGEMENT */}
          {loading ? (
            <div className="flex justify-center items-center min-h-75">
              <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-purple-500"></div>
              <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-red-500 ml-3"></div>
              <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-blue-500 ml-3"></div>
            </div>
          ) : products.length === 0 ? (
            /* AUCUN PRODUIT */
            <div className="flex min-h-75 flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#29438f]/10">
                <Package size={30} className="text-[#29438f]" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                Aucun produit
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Aucun produit n'est actuellement disponible.
              </p>

              <Link
                to="/dashboard/produits/ajouter"
                className="mt-5 flex items-center gap-2 rounded-xl bg-[#29438f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#203675]"
              >
                <Plus size={18} />
                Ajouter un produit
              </Link>
            </div>
          ) : (
            <>
              {/* VERSION DESKTOP */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50 text-left">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Produit
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Catégorie
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Type
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Forme
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Prix
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70"
                      >
                        {/* PRODUIT */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f3]">
                              <img
                                src={`http://localhost:3000/${product.image}`}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div>
                              <p className="font-medium text-gray-900">
                                {product.name}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                ID #{product.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* CATEGORIE */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {product.category}
                        </td>

                        {/* TYPE */}
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-[#29438f]/10 px-3 py-1 text-xs font-medium text-[#29438f]">
                            {product.type}
                          </span>
                        </td>

                        {/* FORME */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {product.shape}
                        </td>

                        {/* PRIX */}
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {product.price.toLocaleString("fr-FR")} CFA
                        </td>

                        {/* ACTIONS */}
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            {/* VOIR */}
                            <Link
                              to={`/product/${product.id}`}
                              title="Voir le produit"
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#29438f] hover:text-[#29438f]"
                            >
                              <Eye size={17} />
                            </Link>

                            {/* MODIFIER */}
                            <Link
                              to={`/dashboard/produits/modifier/${product.id}`}
                              title="Modifier le produit"
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-[#29438f] hover:text-[#29438f]"
                            >
                              <Pencil size={17} />
                            </Link>

                            {/* SUPPRIMER */}
                            <button
                              type="button"
                              title="Supprimer le produit"
                              disabled={deletingId === product.id}
                              onClick={() =>
                                handleDelete(product.id, product.name)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deletingId === product.id ? (
                                <Loader2 size={17} className="animate-spin" />
                              ) : (
                                <Trash2 size={17} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* VERSION MOBILE */}
              <div className="divide-y divide-gray-100 md:hidden">
                {products.map((product) => (
                  <div key={product.id} className="p-4">
                    <div className="flex gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f3]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-gray-900">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {product.category} · {product.type}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {product.shape}
                        </p>

                        <p className="mt-2 font-semibold text-[#29438f]">
                          {product.price.toLocaleString("fr-FR")} CFA
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS MOBILE */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-600"
                      >
                        <Eye size={15} />
                        Voir
                      </Link>

                      <Link
                        to={`/dashboard/produits/modifier/${product.id}`}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-600"
                      >
                        <Pencil size={15} />
                        Modifier
                      </Link>

                      <button
                        type="button"
                        disabled={deletingId === product.id}
                        onClick={() => handleDelete(product.id, product.name)}
                        className="flex items-center justify-center gap-2 rounded-lg border border-red-100 py-2 text-xs font-medium text-red-600"
                      >
                        {deletingId === product.id ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
