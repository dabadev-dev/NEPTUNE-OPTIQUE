import type { Product } from "../data/products";

const CART_KEY = "neptune_cart";

export interface CartItem {
  product: Product;
  quantity: number;
}

export function getCart(): CartItem[] {
  const cart = localStorage.getItem(CART_KEY);

  if (!cart) {
    return [];
  }

  try {
    return JSON.parse(cart);
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));
}

export function addToCart(product: Product, quantity = 1) {
  const cart = getCart();

  const existingItem = cart.find(
    (item) => item.product.id === product.id,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      product,
      quantity,
    });
  }

  saveCart(cart);
}

export function removeFromCart(productId: number) {
  const cart = getCart().filter(
    (item) => item.product.id !== productId,
  );

  saveCart(cart);
}

export function updateCartQuantity(
  productId: number,
  quantity: number,
) {
  const cart = getCart();

  const item = cart.find(
    (item) => item.product.id === productId,
  );

  if (!item) return;

  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  item.quantity = quantity;

  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);

  window.dispatchEvent(new Event("cartUpdated"));
}

export function getCartCount(): number {
  return getCart().reduce(
    (total, item) => total + item.quantity,
    0,
  );
}

export function getCartTotal(): number {
  return getCart().reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0,
  );
}