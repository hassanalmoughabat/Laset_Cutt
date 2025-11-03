# LaserCraft - Custom Laser-Cut E-Commerce Frontend

A beautiful, modern e-commerce frontend for customizable laser-cut products. Built with React, TypeScript, and Fabric.js for an interactive design experience.

## 🚀 Features

- **Interactive Product Customization**: Upload PNG images, auto-convert to black silhouettes, and position them on products using Fabric.js canvas
- **Responsive Design**: Beautiful industrial-themed UI that works across all devices
- **Shopify-Ready Architecture**: Structured for easy integration with Shopify Storefront API
- **Product Categories**: Hangers, clocks, office accessories, and more
- **Mock Cart System**: Functional cart with localStorage, ready for Shopify Cart API integration
- **Modern Tech Stack**: React, TypeScript, TailwindCSS, shadcn/ui components

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design tokens
- **UI Components**: shadcn/ui
- **Canvas Library**: Fabric.js for image manipulation
- **Routing**: React Router v6
- **State Management**: React Query for data fetching
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── Header.tsx             # Main navigation header
│   ├── Footer.tsx             # Footer with links
│   ├── ProductCard.tsx        # Product display card
│   └── ImageCustomizer.tsx    # Fabric.js canvas for customization
├── pages/
│   ├── Index.tsx              # Home page with hero & featured products
│   ├── Shop.tsx               # Product listing with filters
│   ├── ProductDetail.tsx      # Product page with customization
│   ├── Cart.tsx               # Shopping cart page
│   ├── About.tsx              # Company information
│   └── Contact.tsx            # Contact form
├── lib/
│   └── shopify/
│       └── index.ts           # Shopify API placeholder functions
├── data/
│   └── products.json          # Mock product data
└── index.css                  # Design system with HSL color tokens
```

## 🎨 Design System

The project uses a comprehensive design system defined in `src/index.css` and `tailwind.config.ts`:

- **Colors**: Industrial palette with matte black, metallic grays, and laser red accent
- **Gradients**: Custom metallic and industrial gradients
- **Animations**: Fade-in effects and glow pulse for laser theme
- **Button Variants**: `hero` (with glow effect) and `industrial` (with gradient)

## 🖼️ Image Customization

The `ImageCustomizer` component provides:

1. **PNG Upload**: Drag and drop or click to upload
2. **Auto Black Conversion**: Automatically converts uploaded images to black silhouettes
3. **Canvas Controls**:
   - Drag to reposition
   - Rotate (15° increments)
   - Scale (zoom in/out)
   - Delete selected elements
   - Reset canvas
4. **Real-time Preview**: See changes instantly on the product

## 🔌 Shopify Integration Points

The codebase is structured for easy Shopify integration:

### 1. Product Fetching (`src/lib/shopify/index.ts`)

Replace mock functions with Shopify Storefront API:

```typescript
// TODO: Replace with Shopify GraphQL query
export const getProducts = async (): Promise<Product[]> => {
  // Current: Returns mock data from products.json
  // Future: Query Shopify Storefront API
  const response = await fetch('YOUR_SHOPIFY_STOREFRONT_API', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': 'YOUR_TOKEN'
    },
    body: JSON.stringify({
      query: `{ products(first: 50) { ... } }`
    })
  });
  // Parse and return products
};
```

### 2. Cart Management

Current: Uses `localStorage`  
Future: Replace with Shopify Cart API

```typescript
// TODO: Connect to Shopify Cart API
export const addToCart = async (item: CartItem) => {
  // Call Shopify Cart API to add item with customization data
  // Store customization.imageData as metafield or custom attribute
};
```

### 3. Checkout

The "Proceed to Checkout" button in `Cart.tsx` should redirect to Shopify checkout:

```typescript
// Redirect to Shopify checkout with cart items
window.location.href = shopifyCheckoutUrl;
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd lasercraft-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## 📦 Mock Data Structure

Products are defined in `src/data/products.json`:

```json
{
  "products": [
    {
      "id": "unique-id",
      "name": "Product Name",
      "category": "hangers|clocks|office",
      "price": 24.99,
      "description": "Product description",
      "image": "/placeholder.svg",
      "material": "Birch Plywood",
      "dimensions": "16\" x 8\"",
      "customizable": true
    }
  ],
  "categories": [...]
}
```

## 🎯 Customization Canvas Workflow

1. User selects a product
2. Navigates to product detail page
3. Uploads PNG image
4. Image is automatically converted to black using canvas manipulation
5. User positions/scales/rotates the design on the product preview
6. Clicks "Add to Cart" - customization data (including base64 image) is saved
7. Cart displays the customized preview
8. Checkout (ready for Shopify integration)

## 🔐 Environment Variables

When integrating with Shopify, add:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Touch-friendly interface for mobile customization

## 🎨 Color Palette

- **Background**: `hsl(0, 0%, 98%)` (light) / `hsl(0, 0%, 6%)` (dark)
- **Primary**: `hsl(0, 0%, 10%)` - Matte black
- **Secondary**: `hsl(0, 0%, 20%)` - Dark gray
- **Accent**: `hsl(0, 84%, 60%)` - Laser red
- **Muted**: `hsl(220, 13%, 91%)` - Light gray

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Fabric.js](http://fabricjs.com/) for canvas manipulation
- [Lucide](https://lucide.dev/) for icons
- [TailwindCSS](https://tailwindcss.com/) for styling

---

**Ready to integrate with Shopify?** Check the integration points in `src/lib/shopify/index.ts` to get started!
