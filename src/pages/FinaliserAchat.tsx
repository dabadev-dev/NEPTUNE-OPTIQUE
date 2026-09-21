import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getCart } from "../services/cartService";
import { createOrder } from "../services/orderService";

import type { Product } from "../data/products";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export default function FinaliserAchat() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("Dakar");
  const [paiement, setPaiement] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch (error) {
        console.error(
          "Erreur chargement panier :",
          error,
        );
      }
    };

    loadCart();
  }, []);

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.product.price) * item.quantity,
    0,
  );

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    if (
      !nom.trim() ||
      !telephone.trim() ||
      !adresse.trim() ||
      !ville.trim() ||
      !paiement
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // Création de la commande dans le backend
      await createOrder({
        nom,
        telephone,
        adresse,
        ville,
        paiement,
      });

      // Préparation des produits
      const produits = cart
        .map(
          (item) =>
            `- ${item.product.name} x${item.quantity}`,
        )
        .join("\n");

      // Message WhatsApp
      const message = `Bonjour Neptune Optique 👋

Je viens de passer une commande.

👤 Nom : ${nom}
📞 Téléphone : ${telephone}

📦 Produits :
${produits}

💰 Total : ${total.toLocaleString("fr-FR")} CFA

📍 Adresse : ${adresse}
🏙️ Ville : ${ville}
💳 Paiement : ${paiement}

Merci.`;

      // Ouverture de WhatsApp
      const whatsappUrl = `https://wa.me/221782202720?text=${encodeURIComponent(
        message,
      )}`;

      window.open(whatsappUrl, "_blank");

      alert("Commande créée avec succès !");

      // Redirection vers mes commandes
      navigate("/mes-commandes");
    } catch (error: any) {
      console.error(
        "Erreur création commande :",
        error,
      );

      alert(
        error.response?.data?.message ||
          "Impossible de créer la commande.",
      );
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f8f6] px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-light">
            Votre panier est vide
          </h1>

          <Link
            to="/"
            className="inline-block bg-black px-6 py-3 text-sm text-white"
          >
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/panier"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} />
          Retour au panier
        </Link>

        <h1 className="mb-10 text-3xl font-light">
          Finaliser l'achat
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-10 lg:grid-cols-3"
        >
          {/* Informations de livraison */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6">
              <h2 className="mb-6 text-xl font-medium">
                Informations de livraison
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm">
                    Nom complet
                  </label>

                  <input
                    type="text"
                    value={nom}
                    onChange={(e) =>
                      setNom(e.target.value)
                    }
                    placeholder="Votre nom"
                    className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">
                    Téléphone
                  </label>

                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) =>
                      setTelephone(e.target.value)
                    }
                    placeholder="77 123 45 67"
                    className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">
                    Adresse
                  </label>

                  <textarea
                    value={adresse}
                    onChange={(e) =>
                      setAdresse(e.target.value)
                    }
                    placeholder="Votre adresse de livraison"
                    rows={4}
                    className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm">
                    Ville
                  </label>

                  <input
                    type="text"
                    value={ville}
                    onChange={(e) =>
                      setVille(e.target.value)
                    }
                    placeholder="Dakar"
                    className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Paiement */}
            <div className="mt-6 bg-white p-6">
              <h2 className="mb-6 text-xl font-medium">
                Mode de paiement
              </h2>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 border border-gray-300 p-4 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paiement"
                    value="WAVE"
                    checked={paiement === "WAVE"}
                    onChange={(e) =>
                      setPaiement(e.target.value)
                    }
                  />

                  <span>Wave</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 border border-gray-300 p-4 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paiement"
                    value="ORANGE_MONEY"
                    checked={
                      paiement === "ORANGE_MONEY"
                    }
                    onChange={(e) =>
                      setPaiement(e.target.value)
                    }
                  />

                  <span>Orange Money</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 border border-gray-300 p-4 hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paiement"
                    value="LIVRAISON"
                    checked={paiement === "LIVRAISON"}
                    onChange={(e) =>
                      setPaiement(e.target.value)
                    }
                  />

                  <span>
                    Paiement à la livraison
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Résumé */}
          <div className="h-fit bg-white p-6">
            <h2 className="mb-6 text-xl font-medium">
              Résumé de la commande
            </h2>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3"
                >
                  <img
                    src={`http://localhost:3000/${item.product.image}`}
                    alt={item.product.name}
                    className="h-16 w-16 object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item.product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      x {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-medium">
                    {(
                      Number(item.product.price) *
                      item.quantity
                    ).toLocaleString("fr-FR")}{" "}
                    CFA
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between border-t pt-4 text-lg font-semibold">
              <span>Total</span>

              <span>
                {total.toLocaleString("fr-FR")} CFA
              </span>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-black px-6 py-4 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Confirmer la commande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
