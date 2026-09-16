import { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  getCartTotal,
  type CartItem,
} from "../utils/Panier";

export default function Panier() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const total = getCartTotal();

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* HEADER */}
        <div className="mb-10">
          <Link
            to="/catalogue"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#29438f]"
          >
            <ArrowLeft size={17} />
            Continuer mes achats
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#29438f] text-white">
              <ShoppingBag size={22} />
            </div>

            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                Mon panier
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {cart.length === 0
                  ? "Votre panier est vide"
                  : `${cart.length} produit${cart.length > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
        </div>

        {/* PANIER VIDE */}
        {cart.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm">
            <ShoppingBag
              size={55}
              className="mx-auto mb-5 text-gray-300"
            />

            <h2 className="text-xl font-semibold text-gray-800">
              Votre panier est vide
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Découvrez notre collection de lunettes et ajoutez
              vos produits préférés à votre panier.
            </p>

            <Link
              to="/catalogue"
              className="mt-7 inline-flex rounded-lg bg-[#29438f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#20356f]"
            >
              Découvrir les produits
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* PRODUITS */}
            <section className="space-y-4">
              {cart.map((item) => (
                <article
                  key={item.product.id}
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">

                    {/* IMAGE */}
                    <Link
                      to={`/product/${item.product.id}`}
                      className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-[#f5f5f3] sm:w-32"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    {/* INFORMATIONS */}
                    <div className="flex flex-1 flex-col justify-between">

                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              to={`/product/${item.product.id}`}
                              className="text-lg font-medium text-gray-900 hover:text-[#29438f]"
                            >
                              {item.product.name}
                            </Link>

                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.type}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item.product.id)
                            }
                            className="text-gray-400 transition hover:text-red-500"
                            aria-label="Supprimer"
                          >
                            <Trash2 size={19} />
                          </button>
                        </div>

                        <p className="mt-3 font-medium text-[#29438f]">
                          {item.product.price.toLocaleString("fr-FR")} CFA
                        </p>
                      </div>

                      {/* QUANTITE */}
                      <div className="mt-5 flex items-center justify-between">

                        <div className="flex items-center rounded-lg border border-gray-200">
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.quantity - 1,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center text-gray-600 hover:bg-gray-50"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="flex h-9 w-10 items-center justify-center border-x border-gray-200 text-sm font-medium">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.quantity + 1,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center text-gray-600 hover:bg-gray-50"
                          >
                            <Plus size={15} />
                          </button>
                        </div>

                        <p className="font-semibold text-gray-900">
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString("fr-FR")}{" "}
                          CFA
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* RESUME */}
            <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6">

              <h2 className="text-xl font-semibold text-gray-900">
                Résumé de la commande
              </h2>

              <div className="mt-6 space-y-4 border-b border-gray-100 pb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Sous-total</span>
                  <span>
                    {total.toLocaleString("fr-FR")} CFA
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Livraison</span>
                  <span>À définir</span>
                </div>
              </div>

              <div className="mt-5 flex justify-between">
                <span className="font-semibold">Total</span>

                <span className="text-xl font-bold text-[#29438f]">
                  {total.toLocaleString("fr-FR")} CFA
                </span>
              </div>

              <button
                type="button"
                className="mt-7 w-full rounded-lg bg-[#29438f] py-3.5 text-sm font-medium text-white transition hover:bg-[#20356f]"
              >
                Passer la commande
              </button>

              <p className="mt-4 text-center text-xs text-gray-400">
                Le paiement sera disponible prochainement.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}