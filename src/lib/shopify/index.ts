// Shopify API placeholder functions
// TODO: Replace with actual Shopify Storefront API calls

import productsData from "@/data/products.json";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  material: string;
  dimensions: string;
  customizable: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CustomizationData {
  imageData?: string; // base64 or URL
  text?: string;
  position?: { x: number; y: number };
  scale?: number;
  rotation?: number;
  customObjects?: any[]; // Store positions and properties of custom elements
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization?: CustomizationData;
  id: string;
}

// Mock product fetching
// TODO: Replace with Shopify Storefront API GraphQL query
export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData.products as Product[]);
    }, 300);
  });
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = productsData.products.find((p) => p.id === id);
      resolve(product ? (product as Product) : null);
    }, 300);
  });
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = productsData.products.filter((p) => p.category === category);
      resolve(filtered as Product[]);
    }, 300);
  });
};

export const getCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData.categories as Category[]);
    }, 300);
  });
};

// Cart management (localStorage for now)
// TODO: Connect to Shopify Cart API
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem("lasercut-cart");
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item: CartItem): void => {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    (i) => i.product.id === item.product.id && JSON.stringify(i.customization) === JSON.stringify(item.customization)
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  localStorage.setItem("lasercut-cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
};

export const updateCartItem = (itemId: string, quantity: number): void => {
  const cart = getCart();
  const item = cart.find((i) => i.id === itemId);
  if (item) {
    item.quantity = quantity;
    localStorage.setItem("lasercut-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
  }
};

export const removeFromCart = (itemId: string): void => {
  const cart = getCart().filter((i) => i.id !== itemId);
  localStorage.setItem("lasercut-cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
};

export const clearCart = (): void => {
  localStorage.removeItem("lasercut-cart");
  window.dispatchEvent(new Event("cart-updated"));
};
