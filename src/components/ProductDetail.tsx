import { useState } from "react";
import {
  ArrowLeftRight,
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingBag,
  CreditCard,
  Gift,
  RotateCcw,
  Truck,
} from "lucide-react";
import type { Product } from "../data/products";
import { FaWhatsapp } from "react-icons/fa";

interface ProductDetailProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export default function ProductDetail({
  product,
  onAddToCart,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const images = [product.image];
  const stock = 10;
  const categories = [product.category, product.type, product.shape];

  const formatPrice = (price: number) => {
    return `${price.toLocaleString("fr-FR")} CFA`;
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(stock, prev + 1));
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-300 px-4 py-10 md:px-6 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">

          {/* =========================
              GALERIE PRODUIT
          ========================== */}
          <div>
            {/* Image principale */}
            <div className="relative aspect-square w-full overflow-hidden bg-[#f5f5f3]">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />

              {/* Bouton précédent */}
              {selectedImage > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedImage((prev) => prev - 1)}
                  className="
                    absolute left-4 top-1/2
                    flex h-10 w-10 -translate-y-1/2
                    items-center justify-center
                    rounded-full bg-white/90
                    text-gray-800 shadow-sm
                    transition hover:bg-[#263f87] hover:text-white
                  "
                >
                  <ArrowLeftRight size={18} />
                </button>
              )}

              {/* Bouton suivant */}
              {selectedImage < images.length - 1 && (
                <button
                  type="button"
                  onClick={() => setSelectedImage((prev) => prev + 1)}
                  className="
                    absolute right-4 top-1/2
                    flex h-10 w-10 -translate-y-1/2
                    items-center justify-center
                    rounded-full bg-white/90
                    text-gray-800 shadow-sm
                    transition hover:bg-[#263f87] hover:text-white
                  "
                >
                  <ArrowLeftRight size={18} />
                </button>
              )}
            </div>

            {/* Miniatures */}
            <div className="mt-5 flex gap-5 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`
                    h-20 w-20 shrink-0 overflow-hidden border
                    transition
                    ${
                      selectedImage === index
                        ? "border-[#263f87]"
                        : "border-gray-200 hover:border-gray-400"
                    }
                  `}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* =========================
              INFORMATIONS PRODUIT
          ========================== */}
          <div className="flex flex-col">
            {/* Nom */}
            <h1 className="font-serif text-3xl font-semibold leading-tight text-[#171717] md:text-4xl">
              {product.name}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-gray-600 md:text-base">
              Lunettes de qualité pour compléter votre style au quotidien.
            </p>

            {/* Prix */}
            <p className="mt-5 text-2xl font-medium text-[#171717] md:text-3xl">
              {formatPrice(product.price)}
            </p>

            {/* Ligne */}
            <div className="my-7 h-px w-full bg-gray-200" />

            {/* =========================
                BOUTONS ACTION
            ========================== */}
            <div className="flex flex-wrap items-center gap-3">

              {/* Comparer */}
              <button
                type="button"
                className="
                  flex h-10 w-10 items-center justify-center
                  border border-gray-300
                  text-gray-700
                  transition
                  hover:border-[#263f87]
                  hover:text-[#263f87]
                "
                title="Comparer"
              >
                <ArrowLeftRight size={18} strokeWidth={1.5} />
              </button>

              {/* Favoris */}
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`
                  flex h-10 w-10 items-center justify-center
                  border border-gray-300
                  transition
                  ${
                    isFavorite
                      ? "border-[#263f87] text-[#263f87]"
                      : "text-gray-700 hover:border-[#263f87] hover:text-[#263f87]"
                  }
                `}
                title="Ajouter aux favoris"
              >
                <Heart
                  size={19}
                  strokeWidth={1.5}
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </button>

              {/* Partager */}
              <button
                type="button"
                className="
                  flex h-10 w-10 items-center justify-center
                  border border-gray-300
                  text-gray-700
                  transition
                  hover:border-[#263f87]
                  hover:text-[#263f87]
                "
                title="Partager"
              >
                <Share2 size={18} strokeWidth={1.5} />
              </button>

              {/* WhatsApp */}
              <button
                type="button"
                className="
                  flex h-10 items-center gap-2
                  border border-gray-300
                  px-4
                  text-sm text-gray-700
                  transition
                  hover:border-[#263f87]
                  hover:text-[#263f87]
                "
              >
                <span className="font-medium"><FaWhatsapp />
</span>
                Share on WhatsApp
              </button>
            </div>

            {/* =========================
                QUANTITE + PANIER
            ========================== */}
            <div className="mt-4 flex flex-wrap gap-4">

              {/* Quantité */}
              <div className="flex h-10 border border-gray-300">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="
                    flex w-10 items-center justify-center
                    text-gray-500
                    hover:bg-gray-100
                  "
                >
                  <Minus size={15} strokeWidth={1.5} />
                </button>

                <span className="flex w-10 items-center justify-center text-sm">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="
                    flex w-10 items-center justify-center
                    text-gray-500
                    hover:bg-gray-100
                  "
                >
                  <Plus size={15} strokeWidth={1.5} />
                </button>
              </div>

              {/* Ajouter au panier */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="
                  flex h-10 items-center justify-center
                  gap-2 border border-[#171717]
                  px-7 text-sm font-medium uppercase
                  transition
                  hover:bg-[#263f87]
                  hover:text-white
                "
              >
                <ShoppingBag size={17} strokeWidth={1.5} />
                Ajouter au panier
              </button>
            </div>

            {/* Favoris texte */}
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className="
                mt-4 flex w-fit items-center gap-2
                text-sm text-gray-700
                transition hover:text-[#263f87]
              "
            >
              <Heart
                size={23}
                strokeWidth={1.5}
                fill={isFavorite ? "currentColor" : "none"}
              />
              Ajouter à la liste d’envies
            </button>

            {/* Demander devis */}
            <button
              type="button"
              className="
                mt-4 w-fit
                bg-[#263f87]
                px-5 py-3
                text-sm font-medium text-white
                transition hover:bg-[#1d3068]
              "
            >
              Demander Un Devis
            </button>

            {/* Ligne */}
            <div className="my-6 h-px w-full bg-gray-200" />

            {/* =========================
                AVANTAGES
            ========================== */}
            <div className="grid grid-cols-3 border border-gray-300">
              
              <div className="flex flex-col items-center px-2 py-6 text-center">
                <CreditCard
                  size={42}
                  strokeWidth={1.2}
                  className="text-gray-700"
                />

                <p className="mt-3 text-xs font-medium uppercase text-gray-800 md:text-sm">
                  Convenient Payment
                </p>
              </div>

              <div className="flex flex-col items-center border-x border-gray-300 px-2 py-6 text-center">
                <Gift
                  size={42}
                  strokeWidth={1.2}
                  className="text-gray-700"
                />

                <p className="mt-3 text-xs font-medium uppercase text-gray-800 md:text-sm">
                  Free Discount Code
                </p>
              </div>

              <div className="flex flex-col items-center px-2 py-6 text-center">
                <RotateCcw
                  size={42}
                  strokeWidth={1.2}
                  className="text-gray-700"
                />

                <p className="mt-3 text-xs font-medium uppercase text-gray-800 md:text-sm">
                  7-Day Return
                </p>
              </div>
            </div>

            {/* =========================
                STOCK / LIVRAISON
            ========================== */}
            <div className="mt-6 border-t border-gray-200 pt-5">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-700">

                <span>
                  Stock:{" "}
                  <strong className="font-medium">
                    {stock}
                  </strong>
                </span>

                <span className="flex items-center gap-2">
                  <Truck size={16} strokeWidth={1.5} />
                  Free delivery from $1000
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600">
                <span>
                  SKU:{" "}
                  <strong className="font-medium text-gray-800">
                    OPT-{product.id}
                  </strong>
                </span>

                <span>
                  Categories:{" "}
                  <strong className="font-medium text-gray-800">
                    {categories.join(", ")}
                  </strong>
                </span>
              </div>
            </div>

            {/* =========================
                PAIEMENT
            ========================== */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex items-center gap-3">

                <img
                  src="/images/image1.png"
                  alt="Visa"
                  className=" w-80"
                />
              </div>

              <p className="text-sm">
                10% off when paying by credit card
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}