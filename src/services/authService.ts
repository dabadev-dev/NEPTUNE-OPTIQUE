import api from "./api";

// =========================
// TYPES
// =========================

export interface User {
  id: number;
  nom: string;
  email: string;
  role: "CLIENT" | "ADMIN";
}

export interface RegisterData {
  nom: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  user: User;
}

// =========================
// INSCRIPTION
// =========================

export async function register(data: RegisterData) {
  const response = await api.post("/auth/register", data);

  return response.data;
}

// =========================
// CONNEXION
// =========================

export async function login(
  data: LoginData,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data,
  );

  // Sauvegarder le token
  localStorage.setItem(
    "access_token",
    response.data.access_token,
  );

  // Sauvegarder les informations de l'utilisateur
  localStorage.setItem(
    "user",
    JSON.stringify(response.data.user),
  );

  return response.data;
}

// =========================
// PROFIL
// =========================

export async function getProfile() {
  const response = await api.get("/auth/profile");

  return response.data;
}

// =========================
// DECONNEXION
// =========================

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}

// =========================
// VERIFIER SI CONNECTE
// =========================

export function isAuthenticated() {
  return !!localStorage.getItem("access_token");
}

// =========================
// RECUPERER L'UTILISATEUR
// =========================

export function getCurrentUser(): User | null {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}