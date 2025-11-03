// Shopify Storefront API Client Configuration
import Client from 'shopify-buy';

// Environment variables for Shopify configuration
const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Validate environment variables
if (!domain || !storefrontAccessToken) {
  console.warn(
    'Shopify credentials not configured. Please add VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN to your .env file.'
  );
}

// Initialize Shopify client
export const shopifyClient = Client.buildClient({
  domain: domain || 'placeholder.myshopify.com',
  storefrontAccessToken: storefrontAccessToken || 'placeholder-token',
  apiVersion: '2024-10', // Use a stable API version
});

// Check if Shopify is properly configured
export const isShopifyConfigured = (): boolean => {
  return !!(domain && storefrontAccessToken &&
    domain !== 'your-store.myshopify.com' &&
    storefrontAccessToken !== 'your-storefront-access-token');
};
