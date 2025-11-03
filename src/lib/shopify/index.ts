// Shopify API integration - no fallback to mock data
import { shopifyClient, isShopifyConfigured } from "./client";

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

// Helper function to convert Shopify product to our Product type
const convertShopifyProduct = (shopifyProduct: any): Product => {
  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    category: shopifyProduct.productType || 'uncategorized',
    price: parseFloat(shopifyProduct.variants[0]?.price?.amount || '0'),
    description: shopifyProduct.description || '',
    image: shopifyProduct.images[0]?.src || '/placeholder.svg',
    material: shopifyProduct.metafields?.find((m: any) => m.key === 'material')?.value || 'N/A',
    dimensions: shopifyProduct.metafields?.find((m: any) => m.key === 'dimensions')?.value || 'N/A',
    customizable: shopifyProduct.metafields?.find((m: any) => m.key === 'customizable')?.value === 'true' || true,
  };
};

// Fetch products from Shopify
export const getProducts = async (): Promise<Product[]> => {
  if (!isShopifyConfigured()) {
    throw new Error('Shopify is not configured. Please add VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN to your .env file.');
  }

  const shopifyProducts = await shopifyClient.product.fetchAll();
  return shopifyProducts.map(convertShopifyProduct);
};

export const getProductById = async (id: string): Promise<Product | null> => {
  if (!isShopifyConfigured()) {
    throw new Error('Shopify is not configured. Please add credentials to your .env file.');
  }

  const shopifyProduct = await shopifyClient.product.fetch(id);
  return shopifyProduct ? convertShopifyProduct(shopifyProduct) : null;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  if (!isShopifyConfigured()) {
    throw new Error('Shopify is not configured. Please add credentials to your .env file.');
  }

  const allProducts = await getProducts();
  return allProducts.filter((p) => p.category === category);
};

export const getCategories = async (): Promise<Category[]> => {
  if (!isShopifyConfigured()) {
    throw new Error('Shopify is not configured. Please add credentials to your .env file.');
  }

  // Fetch all products and extract unique categories
  const products = await getProducts();
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

  return uniqueCategories.map(cat => ({
    id: cat,
    name: cat.charAt(0).toUpperCase() + cat.slice(1),
    description: `${cat.charAt(0).toUpperCase() + cat.slice(1)} products`
  }));
};

// Shopify checkout instance (stored globally for session persistence)
let shopifyCheckout: any = null;

// Initialize or retrieve Shopify checkout
const getOrCreateCheckout = async (): Promise<any> => {
  if (!isShopifyConfigured()) {
    return null;
  }

  // Check if we have a stored checkout ID
  const checkoutId = localStorage.getItem('shopify-checkout-id');

  if (checkoutId && shopifyCheckout) {
    return shopifyCheckout;
  }

  try {
    if (checkoutId) {
      // Try to fetch existing checkout
      shopifyCheckout = await shopifyClient.checkout.fetch(checkoutId);

      // If checkout is completed or doesn't exist, create new one
      if (!shopifyCheckout || shopifyCheckout.completedAt) {
        shopifyCheckout = await shopifyClient.checkout.create();
        localStorage.setItem('shopify-checkout-id', shopifyCheckout.id);
      }
    } else {
      // Create new checkout
      shopifyCheckout = await shopifyClient.checkout.create();
      localStorage.setItem('shopify-checkout-id', shopifyCheckout.id);
    }

    return shopifyCheckout;
  } catch (error) {
    console.error('Failed to get or create checkout:', error);
    return null;
  }
};

// Cart management with Shopify Cart API integration
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem("lasercut-cart");
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = async (item: CartItem): Promise<void> => {
  // Save to localStorage for display purposes
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

  // Sync with Shopify checkout if configured
  if (isShopifyConfigured()) {
    try {
      const checkout = await getOrCreateCheckout();
      if (checkout) {
        // Add item to Shopify checkout
        const lineItemsToAdd = [{
          variantId: item.product.id,
          quantity: item.quantity,
          customAttributes: item.customization ? [
            { key: 'customization_data', value: JSON.stringify(item.customization) },
            { key: 'has_customization', value: 'true' }
          ] : []
        }];

        await shopifyClient.checkout.addLineItems(checkout.id, lineItemsToAdd);
      }
    } catch (error) {
      console.error('Failed to sync cart with Shopify:', error);
    }
  }
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

export const clearCart = async (): Promise<void> => {
  localStorage.removeItem("lasercut-cart");
  localStorage.removeItem("shopify-checkout-id");
  shopifyCheckout = null;
  window.dispatchEvent(new Event("cart-updated"));
};

// Get Shopify checkout URL for redirect
export const getCheckoutUrl = async (): Promise<string | null> => {
  if (!isShopifyConfigured()) {
    console.error('Shopify is not configured');
    return null;
  }

  try {
    const checkout = await getOrCreateCheckout();
    return checkout ? checkout.webUrl : null;
  } catch (error) {
    console.error('Failed to get checkout URL:', error);
    return null;
  }
};
