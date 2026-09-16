import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Heart,
  Home,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

import {
  getCurrentUser,
  getProfile,
  logout,
  type User as UserType,
} from "../services/authService";

import { products } from "../data/products";
import { getFavorites } from "../utils/favorites";
import { getCartCount } from "../utils/Panier";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserType | null>(
    getCurrentUser(),
  );

  const [loading, setLoading] = useState(true);

  const [favoriteCount, setFavoriteCount] = useState(
    getFavorites().length,
  );

  const [cartCount, setCartCount] = useState(
    getCartCount(),
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();

        setUser(data.user);
      } catch {
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  useEffect(() => {
    const updateStats = () => {
      setFavoriteCount(getFavorites().length);
      setCartCount(getCartCount());
    };

    window.addEventListener(
      "favoritesUpdated",
      updateStats,
    );

    window.addEventListener(
      "cartUpdated",
      updateStats,
    );

    return () => {
      window.removeEventListener(
        "favoritesUpdated",
        updateStats,
      );

      window.removeEventListener(
        "cartUpdated",
        updateStats,
      );
    };
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8f6]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#29438f]" />

          <p className="text-sm text-gray-500">
            Chargement de votre espace...
          </p>
        </div>
      </div>
    );
  }

  const firstProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8f8f6]">

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72
          flex-col bg-white border-r border-gray-100
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* LOGO */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-7">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#29438f] text-white">
              <span className="text-lg font-bold">
                N
              </span>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-gray-900">
                NEPTUNE
              </p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
                Optique
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-7">

          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </p>

          <div className="space-y-1">

            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-xl bg-[#29438f] px-4 py-3 text-sm font-medium text-white"
            >
              <Home size={18} />
              Vue d'ensemble
            </Link>

            <Link
              to="/catalogue"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-[#29438f]"
            >
              <Package size={18} />
              Produits
            </Link>

            <Link
              to="/favoris"
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-[#29438f]"
            >
              <span className="flex items-center gap-3">
                <Heart size={18} />
                Mes favoris
              </span>

              {favoriteCount > 0 && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                  {favoriteCount}
                </span>
              )}
            </Link>

            <Link
              to="/panier"
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-[#29438f]"
            >
              <span className="flex items-center gap-3">
                <ShoppingBag size={18} />
                Mon panier
              </span>

              {cartCount > 0 && (
                <span className="rounded-full bg-[#29438f] px-2 py-0.5 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>

          <div className="my-7 border-t border-gray-100" />

          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Mon compte
          </p>

          <div className="space-y-1">

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-[#29438f]"
            >
              <User size={18} />
              Mon profil
            </button>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-[#29438f]"
            >
              <Settings size={18} />
              Paramètres
            </button>

          </div>
        </nav>

        {/* DECONNEXION */}
        <div className="border-t border-gray-100 p-4">

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            Déconnexion
          </button>

        </div>
      </aside>

      {/* CONTENU */}
      <div className="lg:ml-72">

        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/95 px-5 backdrop-blur sm:px-8">

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-gray-50 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:block">
            <p className="text-sm text-gray-500">
              Espace personnel
            </p>

            <p className="font-semibold text-gray-900">
              Neptune Optique
            </p>
          </div>

          <div className="flex items-center gap-4">

            <Link
              to="/panier"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 text-gray-600 transition hover:border-[#29438f] hover:text-[#29438f]"
            >
              <ShoppingBag size={19} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#29438f] px-1 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="flex items-center gap-3 border-l border-gray-100 pl-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#29438f] text-sm font-semibold text-white">
                {user?.nom?.charAt(0).toUpperCase()}
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.nom}
                </p>

                <p className="text-xs text-gray-400">
                  {user?.role}
                </p>
              </div>

            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">

          {/* BIENVENUE */}
          <section className="mb-8">

            <p className="mb-2 text-sm font-medium text-[#29438f]">
              Votre espace Neptune
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Bonjour {user?.nom} 👋
            </h1>

            <p className="mt-2 text-gray-500">
              Retrouvez vos produits, favoris et votre panier
              au même endroit.
            </p>

          </section>

          {/* STATISTIQUES */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

            <Link
              to="/catalogue"
              className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Produits disponibles
                  </p>

                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {products.length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#29438f]">
                  <Package size={21} />
                </div>

              </div>

              <p className="mt-5 text-xs text-gray-400 group-hover:text-[#29438f]">
                Découvrir le catalogue →
              </p>
            </Link>

            <Link
              to="/favoris"
              className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Mes favoris
                  </p>

                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {favoriteCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#29438f]">
                  <Heart size={21} />
                </div>

              </div>

              <p className="mt-5 text-xs text-gray-400 group-hover:text-[#29438f]">
                Voir mes favoris →
              </p>
            </Link>

            <Link
              to="/panier"
              className="group rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Mon panier
                  </p>

                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {cartCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#29438f]">
                  <ShoppingBag size={21} />
                </div>

              </div>

              <p className="mt-5 text-xs text-gray-400 group-hover:text-[#29438f]">
                Voir mon panier →
              </p>
            </Link>

          </section>

          {/* PRODUITS */}
          <section className="mt-10">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#29438f]">
                  Collection
                </p>

                <h2 className="mt-1 text-2xl font-semibold text-gray-900">
                  Découvrez nos produits
                </h2>
              </div>

              <Link
                to="/catalogue"
                className="hidden text-sm font-medium text-[#29438f] hover:underline sm:block"
              >
                Voir tout →
              </Link>

            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

              {firstProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  <div className="aspect-[4/3] overflow-hidden bg-[#f5f5f3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">

                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      {product.type}
                    </p>

                    <h3 className="mt-1 font-medium text-gray-900">
                      {product.name}
                    </h3>

                    <p className="mt-3 font-semibold text-[#29438f]">
                      {product.price.toLocaleString("fr-FR")} CFA
                    </p>

                  </div>

                </Link>
              ))}

            </div>

            <Link
              to="/catalogue"
              className="mt-6 flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 transition hover:border-[#29438f] hover:text-[#29438f] sm:hidden"
            >
              Voir tous les produits
            </Link>

          </section>

          {/* BLOC RAPIDE */}
          <section className="mt-10 rounded-2xl bg-[#29438f] p-7 text-white sm:p-9">

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="text-sm text-white/70">
                  Neptune Optique
                </p>

                <h2 className="mt-1 text-2xl font-semibold">
                  Trouvez la paire qui vous correspond.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
                  Explorez notre sélection de lunettes optiques
                  et solaires.
                </p>
              </div>

              <Link
                to="/catalogue"
                className="inline-flex w-fit rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#29438f] transition hover:bg-gray-100"
              >
                Explorer le catalogue
              </Link>

            </div>

          </section>

        </main>
      </div>
    </div>
  );
}