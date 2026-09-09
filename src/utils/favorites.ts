
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const STORAGE_KEY = "favorites";

export const getFavorites = (): Product[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

export const toggleFavorite = (product: Product) => {
  const favorites = getFavorites();

  const exists = favorites.some(
    (item) => item.id === product.id
  );

  const updated = exists
    ? favorites.filter((item) => item.id !== product.id)
    : [...favorites, product];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  window.dispatchEvent(new Event("favoritesUpdated"));

  return updated;
};

