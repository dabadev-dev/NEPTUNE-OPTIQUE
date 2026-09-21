import { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import {
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "../services/cartService";

import type { Product } from "../data/products";

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: Product;
}

export default function Panier() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const loadCart = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setCart([]);
      return;
    }

    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error("Erreur chargement panier :", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (productId: number) => {
    try {
      await removeFromCart(productId);

      setCart((prev) =>
        prev.filter(
          (item) => item.productId !== productId,
        ),
      );
    } catch (error) {
      console.error(
        "Erreur suppression panier :",
        error,
      );
    }
  };

  const handleQuantity = async (
    productId: number,
    quantity: number,
  ) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);

        setCart((prev) =>
          prev.filter(
            (item) => item.productId !== productId,
          ),
        );

        return;
      }

      const updatedItem = await updateCartQuantity(
        productId,
        quantity,
      );

      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: updatedItem.quantity,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error(
        "Erreur modification quantité :",
        error,
      );
    }
  };

  // Aller vers la page de finalisation
  const handleCheckout = () => {
    navigate("/finaliser-achat");
  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.product.price) * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* En-tête */}
        <div className="mb-10">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black"
          >
            <ArrowLeft size={18} />
            Continuer mes achats
          </Link>

          <h1 className="text-3xl font-light tracking-wide">
            Mon panier
          </h1>
        </div>

        {/* Panier vide */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag
              size={50}
              strokeWidth={1}
              className="mb-5 text-gray-400"
            />

            <h2 className="mb-2 text-xl font-medium">
              Votre panier est vide
            </h2>

            <p className="mb-6 text-gray-500">
              Découvrez nos produits et ajoutez vos
              favoris au panier.
            </p>

            <Link
              to="/"
              className="bg-black px-6 py-3 text-sm text-white transition hover:bg-gray-800"
            >
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Produits */}
            <div className="space-y-6 lg:col-span-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 border-b border-gray-200 pb-6"
                >
                  <img
                    src={`http://localhost:3000/${item.product.image}`}
                    alt={item.product.name}
                    className="h-32 w-32 object-cover"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-medium">
                        {item.product.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.category}
                      </p>

                      <p className="mt-2 font-medium">
                        {Number(
                          item.product.price,
                        ).toLocaleString("fr-FR")}{" "}
                        CFA
                      </p>
                    </div>

                    {/* Quantité + suppression */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() =>
                            handleQuantity(
                              item.productId,
                              item.quantity - 1,
                            )
                          }
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="px-4">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            handleQuantity(
                              item.productId,
                              item.quantity + 1,
                            )
                          }
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          handleRemove(item.productId)
                        }
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Résumé */}
            <div className="h-fit border border-gray-200 bg-white p-6">
              <h2 className="mb-6 text-xl font-medium">
                Résumé de la commande
              </h2>

              <div className="mb-4 flex justify-between text-sm">
                <span>Sous-total</span>

                <span>
                  {total.toLocaleString("fr-FR")} CFA
                </span>
              </div>

              <div className="mb-6 flex justify-between border-t border-gray-200 pt-4 font-medium">
                <span>Total</span>

                <span>
                  {total.toLocaleString("fr-FR")} CFA
                </span>
              </div>

              {/* Finaliser l'achat */}
              <button
                onClick={handleCheckout}
                className="w-full bg-black px-6 py-4 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Passer la commande
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
