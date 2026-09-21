import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

interface Product {
  id: number;
  name: string;
  image: string;
}

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function MesCommandes() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Erreur chargement commandes :", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <p className="p-10 text-center">
        Chargement...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-light">
          Mes commandes
        </h1>

        {orders.length === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center">
            <p className="text-gray-500">
              Vous n'avez aucune commande.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-lg border border-gray-200 bg-white p-6"
              >
                {/* Informations commande */}
                <div className="mb-6 flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row">
                  <div>
                    <h2 className="text-lg font-medium">
                      Commande #{order.id}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(
                        order.createdAt,
                      ).toLocaleDateString("fr-FR")}
                    </p>
                  </div>

                  <span className="h-fit rounded-full bg-gray-100 px-4 py-2 text-sm">
                    {order.status}
                  </span>
                </div>

                {/* Produits */}
                <div className="space-y-4">
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={`http://localhost:3000/${item.product.image}`}
                        alt={item.product.name}
                        className="h-20 w-20 object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-medium">
                          {item.product.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Quantité : {item.quantity}
                        </p>
                      </div>

                      <p className="font-medium">
                        {Number(item.price).toLocaleString(
                          "fr-FR",
                        )}{" "}
                        CFA
                      </p>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-6 flex justify-between border-t pt-4 text-lg font-semibold">
                  <span>Total</span>

                  <span>
                    {Number(order.total).toLocaleString(
                      "fr-FR",
                    )}{" "}
                    CFA
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}