import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
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

import { getFavorites } from "../utils/favorites";
import { getCartCount } from "../utils/Panier";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<UserType | null>(getCurrentUser());

  const [loading, setLoading] = useState(true);
  const [favoriteCount, setFavoriteCount] = useState(getFavorites().length);
  const [cartCount, setCartCount] = useState(getCartCount());

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // =========================
  // RÉCUPÉRER LE PROFIL
  // =========================

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();

        setUser(data.user);
      } catch (error) {
        console.error(error);

        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  // =========================
  // FAVORIS + PANIER
  // =========================

  useEffect(() => {
    const updateStats = () => {
      setFavoriteCount(getFavorites().length);
      setCartCount(getCartCount());
    };

    window.addEventListener("favoritesUpdated", updateStats);

    window.addEventListener("cartUpdated", updateStats);

    return () => {
      window.removeEventListener("favoritesUpdated", updateStats);

      window.removeEventListener("cartUpdated", updateStats);
    };
  }, []);

  // =========================
  // DÉCONNEXION
  // =========================

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // =========================
  // MENU ACTIF
  // =========================

  function isActive(path: string) {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return location.pathname.startsWith(path);
  }

  // =========================
  // CHARGEMENT
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8f6]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#29438f]" />

          <p className="text-sm text-gray-500">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      {/* =========================
          OVERLAY MOBILE
      ========================= */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72
          flex-col border-r border-gray-100 bg-white
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* LOGO */}

        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-7">
          <Link
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#29438f] text-white">
              <span className="text-lg font-bold">N</span>
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
            className="rounded-lg p-2 hover:bg-gray-50 lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* =========================
            NAVIGATION
        ========================= */}

        <nav className="flex-1 px-4 py-7">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </p>

          <div className="space-y-1">
            {/* ACCUEIL */}

            <Link
              to="/dashboard"
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
                ${
                  isActive("/dashboard")
                    ? "bg-[#29438f] text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#29438f]"
                }
              `}
            >
              <Home size={18} />
              Vue d'ensemble
            </Link>

            {/* PRODUITS */}

            <Link
              to="/dashboard/produits"
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
                ${
                  isActive("/dashboard/produits")
                    ? "bg-[#29438f] text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#29438f]"
                }
              `}
            >
              <Package size={18} />
              Produits
            </Link>

            {/* FAVORIS */}

            <Link
              to="/favoris"
              onClick={() => setSidebarOpen(false)}
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

            {/* PANIER */}

            <Link
              to="/panier"
              onClick={() => setSidebarOpen(false)}
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

             <Link
              to="/dashboard/commandes"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-[#29438f]"
            >
              <span className="flex items-center gap-3">
                <ShoppingBag size={18} />
                Mes Commandes
              </span>

              {cartCount > 0 && (
                <span className="rounded-full bg-[#29438f] px-2 py-0.5 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="my-7 border-t border-gray-100" />

          {/* MON COMPTE */}

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

        {/* =========================
            DÉCONNEXION
        ========================= */}

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

      {/* =========================
          CONTENU PRINCIPAL
      ========================= */}

      <div className="lg:ml-72">
        {/* HEADER */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/95 px-5 backdrop-blur sm:px-8">
          {/* MENU MOBILE */}

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-gray-50 lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* TITRE */}

          <div className="hidden lg:block">
            <p className="text-sm text-gray-500">Espace personnel</p>

            <p className="font-semibold text-gray-900">Neptune Optique</p>
          </div>

          {/* DROITE */}

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

            {/* UTILISATEUR */}

            <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#29438f] text-sm font-semibold text-white">
                {user?.nom?.charAt(0).toUpperCase()}
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.nom}</p>

                <p className="text-xs text-gray-400">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* =========================
            PAGE ACTIVE
        ========================= */}

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
