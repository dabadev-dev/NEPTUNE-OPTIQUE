import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login({
        email,
        password,
      });

      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Email ou mot de passe incorrect.",
        );
      } else {
        setError("Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8fb] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(41,67,143,0.12)] md:grid md:grid-cols-2">

        {/* PARTIE GAUCHE */}
        <div className="relative hidden overflow-hidden bg-[#29438f] md:flex md:min-h-[620px]">
          
          {/* Décorations */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />

          <div className="relative z-10 flex flex-col justify-between p-10 lg:p-14">
            
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="Neptune Optique"
                className="w-44"
              />
            </Link>

            <div className="max-w-sm text-white">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-blue-100">
                Neptune Optique
              </p>

              <h2 className="text-4xl font-semibold leading-tight lg:text-5xl">
                Votre regard,
                <br />
                notre priorité.
              </h2>

              <p className="mt-6 text-sm leading-7 text-blue-100">
                Retrouvez vos lunettes préférées, découvrez notre catalogue
                et profitez d'une expérience simple et élégante.
              </p>
            </div>

            <p className="text-xs text-blue-100">
              © {new Date().getFullYear()} Neptune Optique
            </p>
          </div>
        </div>

        {/* FORMULAIRE */}
        <div className="flex items-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-md mx-auto">

            {/* Logo mobile */}
            <div className="mb-8 flex justify-center md:hidden">
              <Link to="/">
                <img
                  src="/images/logo.png"
                  alt="Neptune Optique"
                  className="w-40"
                />
              </Link>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-[#29438f]">
                Bienvenue chez Neptune
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                Se connecter
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Connectez-vous à votre espace client.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Adresse email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@gmail.com"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#29438f] focus:bg-white focus:ring-4 focus:ring-[#29438f]/10"
                  />
                </div>
              </div>

              {/* MOT DE PASSE */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mot de passe
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-[#29438f] hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#29438f] focus:bg-white focus:ring-4 focus:ring-[#29438f]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#29438f]"
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* BOUTON */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#29438f] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#29438f]/20 transition hover:bg-[#223873] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  "Connexion..."
                ) : (
                  <>
                    Se connecter
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* INSCRIPTION */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">OU</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <p className="text-center text-sm text-gray-500">
              Vous n'avez pas encore de compte ?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#29438f] hover:underline"
              >
                Créer un compte
              </Link>
            </p>

            <Link
              to="/"
              className="mt-6 block text-center text-xs text-gray-400 transition hover:text-[#29438f]"
            >
              ← Retour au site
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}