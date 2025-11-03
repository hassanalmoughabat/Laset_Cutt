# LaserCraft E-Commerce - Codebase Analysis & Edit Guide

**Last Updated:** November 2, 2025  
**Project Type:** React + TypeScript + Vite E-Commerce Frontend  
**Purpose:** Custom laser-cut product customization and sales platform

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Pattern](#architecture-pattern)
4. [Key Features & Components](#key-features--components)
5. [Data Flow](#data-flow)
6. [File Structure Reference](#file-structure-reference)
7. [Common Edit Scenarios](#common-edit-scenarios)
8. [Integration Points](#integration-points)
9. [Development Workflow](#development-workflow)

---

## 📊 Project Overview

**Business Purpose:** E-commerce platform for selling customizable laser-cut products (hangers, clocks, office items)

**Core Value Proposition:**
- Real-time product customization with image upload
- Drag-and-drop icon placement
- Text personalization
- Visual preview before purchase

**Current State:** Mock data implementation, ready for Shopify integration

---

## 🛠️ Technology Stack

### Core Framework
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 5.4.19** - Build tool & dev server
- **Bun** - Package manager (lockfile: `bun.lockb`)

### UI & Styling
- **TailwindCSS 3.4.17** - Utility-first CSS
- **shadcn/ui** - Prebuilt accessible components
- **Lucide React** - Icon library
- **next-themes** - Dark/light mode support

### State & Data Management
- **React Query (@tanstack/react-query 5.83.0)** - Server state management
- **React Router DOM 6.30.1** - Client-side routing
- **localStorage** - Cart persistence (temporary, awaiting Shopify)

### Canvas & Customization
- **Fabric.js 6.7.1** - Image manipulation & canvas controls
- **Custom ImageCustomizer component** - Handles product customization logic

### Form Management
- **React Hook Form 7.61.1** - Form state management
- **Zod 3.25.76** - Schema validation
- **@hookform/resolvers 3.10.0** - Form validation integration

---

## 🏗️ Architecture Pattern

### **Component Architecture: Atomic Design**

```
Pages (Organisms)
  ├─ Index.tsx          → Landing page with hero & featured products
  ├─ Shop.tsx           → Product listing with category filters
  ├─ ProductDetail.tsx  → Single product + customization interface
  ├─ Cart.tsx           → Shopping cart with checkout
  ├─ About.tsx          → Company info
  └─ Contact.tsx        → Contact form

Components (Molecules)
  ├─ Header.tsx         → Navigation bar with cart count
  ├─ Footer.tsx         → Site footer with links
  ├─ ProductCard.tsx    → Product display card
  └─ ImageCustomizer.tsx → Fabric.js canvas wrapper

UI Components (Atoms)
  └─ components/ui/*    → shadcn/ui base components (40+ files)
```

### **State Management Strategy**

1. **Server State** (React Query)
   - Product fetching
   - Category data
   - Future: Shopify API calls

2. **Local State** (useState)
   - Form inputs
   - UI toggles
   - Canvas selections

3. **Persistent State** (localStorage)
   - Shopping cart
   - Customization data

4. **Global Events** (CustomEvent)
   - `cart-updated` event → Triggers cart badge updates

---

## 🎯 Key Features & Components

### **1. Product Customization System**

**Component:** `ImageCustomizer.tsx`

**Capabilities:**
- ✅ Upload PNG/JPG images
- ✅ Auto-convert to black silhouette
- ✅ Drag, rotate, scale, delete objects
- ✅ Icon placement from predefined library
- ✅ Text overlay with custom name
- ✅ Export canvas as base64 PNG
- ✅ Track all custom objects with position/scale/rotation data

**Props Interface:**
```typescript
interface ImageCustomizerProps {
  productImage: string;
  selectedIcons: { id: string; url: string; initialLeft: number; initialTop: number; }[];
  nameText: string;
  onCustomizationChange?: (data: {
    imageData?: string;
    hasCustomization: boolean;
    customObjects: CustomObjectData[];
  }) => void;
}
```

**Key Methods:**
- `convertToBlack()` - Converts uploaded images to black silhouettes using canvas pixel manipulation
- `updateCustomization()` - Exports canvas state to parent component
- `rotateSelected()` - Rotates active object by 15°
- `scaleSelected()` - Scales active object by factor (1.1 or 0.9)
- `deleteSelected()` - Removes active object from canvas
- `resetCanvas()` - Clears all custom objects

**Canvas Layers (bottom to top):**
1. Product background image (non-selectable)
2. Custom uploaded images
3. Icon overlays
4. Text layers

---

### **2. Product Detail Page**

**Component:** `ProductDetail.tsx`

**User Flow:**
1. User navigates to `/product/:id`
2. Product data fetched via `getProductById(id)`
3. User selects icons from dropdowns (4 icons: left1, left2, right1, right2)
4. User enters name text
5. Canvas updates in real-time with selections
6. User uploads custom image (optional)
7. User manipulates canvas objects
8. Click "Add to Cart" → Saves customization data + canvas snapshot

**State Management:**
```typescript
const [product, setProduct] = useState<Product | null>(null);
const [customization, setCustomization] = useState<CustomizationData>({
  hasCustomization: false,
  customObjects: []
});
const [selectedLeftIcon1, setSelectedLeftIcon1] = useState<string | null>(null);
// ... 3 more icon states
const [nameText, setNameText] = useState("");
```

**Validation:**
- ❌ Cannot add to cart without customization
- ✅ Toast notification on success/error

---

### **3. Shopping Cart System**

**File:** `src/lib/shopify/index.ts`

**Current Implementation:** localStorage-based mock cart

**Cart Operations:**
```typescript
getCart()              → CartItem[]
addToCart(item)        → void
updateCartItem(id, qty) → void
removeFromCart(id)     → void
clearCart()            → void
```

**CartItem Interface:**
```typescript
interface CartItem {
  product: Product;
  quantity: number;
  customization?: {
    imageData?: string;      // base64 canvas export
    customObjects: any[];    // Object positions/properties
  };
  id: string;                // Unique cart item ID
}
```

**Event System:**
```typescript
window.dispatchEvent(new Event("cart-updated"));
// Triggers Header component to update cart badge count
```

---

### **4. Routing Structure**

**File:** `src/App.tsx`

**Routes:**
```typescript
/               → Index (Home page)
/shop           → Shop (Product listing)
/product/:id    → ProductDetail (Single product + customization)
/cart           → Cart (Shopping cart)
/about          → About (Company info)
/contact        → Contact (Contact form)
/*              → NotFound (404 page)
```

**Layout:**
```
┌─────────────────────────────────┐
│       Header (Navigation)        │
├─────────────────────────────────┤
│                                  │
│         Main Content             │
│      (Route Components)          │
│                                  │
├─────────────────────────────────┤
│       Footer (Links)             │
└─────────────────────────────────┘
```

---

## 🔄 Data Flow

### **Product Customization Flow**

```
┌───────────────────┐
│  ProductDetail    │
│  (Parent)         │
└─────────┬─────────┘
          │ Props ↓
          │ - productImage
          │ - selectedIcons[]
          │ - nameText
          │ - onCustomizationChange()
          ↓
┌───────────────────┐
│ ImageCustomizer   │
│ (Fabric.js Canvas)│
└─────────┬─────────┘
          │ Callback ↑
          │ - imageData (base64)
          │ - customObjects[]
          │ - hasCustomization
          ↓
┌───────────────────┐
│  Add to Cart      │
│  (localStorage)   │
└───────────────────┘
```

### **Cart Update Flow**

```
addToCart() → localStorage.setItem()
           → window.dispatchEvent("cart-updated")
           → Header.useEffect() listens
           → Updates cart badge count
```

---

## 📂 File Structure Reference

### **Critical Files to Edit**

| File | Purpose | When to Edit |
|------|---------|--------------|
| `src/pages/ProductDetail.tsx` | Product customization page | Add new customization options, change layout |
| `src/components/ImageCustomizer.tsx` | Canvas manipulation | Modify canvas behavior, add new tools |
| `src/lib/shopify/index.ts` | Data fetching & cart logic | Connect to Shopify API, change data structure |
| `src/data/products.json` | Mock product data | Add/edit products before Shopify integration |
| `src/App.tsx` | Routing & layout | Add new routes, change app structure |
| `src/index.css` | Design system tokens | Update colors, fonts, animations |
| `tailwind.config.ts` | Tailwind configuration | Add custom utilities, extend theme |

### **UI Component Library**

**Location:** `src/components/ui/*`

**Most Used Components:**
- `button.tsx` - Variants: default, hero, industrial, destructive
- `input.tsx` - Text inputs
- `select.tsx` - Dropdowns (used for icon selection)
- `card.tsx` - Product cards
- `dialog.tsx` - Modals
- `toast.tsx` / `sonner.tsx` - Notifications

**Usage Example:**
```tsx
import { Button } from "@/components/ui/button";
<Button variant="hero">Click Me</Button>
```

---

## 🎨 Design System

### **Color Tokens** (defined in `src/index.css`)

```css
--background: 0 0% 98%;        /* Light gray background */
--foreground: 0 0% 10%;        /* Almost black text */
--primary: 0 0% 10%;           /* Matte black */
--accent: 0 84% 60%;           /* Laser red (#E63946) */
--muted: 220 13% 91%;          /* Light gray for muted elements */
```

### **Custom CSS Classes**

```css
.gradient-metal     → Silver metallic gradient
.gradient-industrial → Dark industrial gradient
.animate-glow-pulse  → Laser red pulsing glow
.animate-fade-in     → Fade in animation
```

### **Button Variants**

```typescript
// src/lib/button-variants.ts
buttonVariants({
  variant: "default" | "hero" | "industrial" | "destructive" | "outline" | "ghost" | "link",
  size: "default" | "sm" | "lg" | "icon"
})
```

---

## ✏️ Common Edit Scenarios

### **Scenario 1: Add New Customization Option**

**Goal:** Add a dropdown for selecting product finish (matte/glossy)

**Files to Edit:**
1. `src/pages/ProductDetail.tsx`
   ```tsx
   const [selectedFinish, setSelectedFinish] = useState<string>("matte");
   
   // Add in customization options section:
   <div>
     <Label htmlFor="finish">Finish</Label>
     <Select onValueChange={setSelectedFinish} value={selectedFinish}>
       <SelectTrigger id="finish">
         <SelectValue placeholder="Select finish" />
       </SelectTrigger>
       <SelectContent>
         <SelectItem value="matte">Matte</SelectItem>
         <SelectItem value="glossy">Glossy</SelectItem>
       </SelectContent>
     </Select>
   </div>
   ```

2. Update `customization` object in `handleAddToCart()`
   ```tsx
   customization: {
     imageData: customization.imageData,
     customObjects: customization.customObjects,
     finish: selectedFinish, // NEW
   }
   ```

---

### **Scenario 2: Add New Product Category**

**Files to Edit:**
1. `src/data/products.json`
   ```json
   {
     "categories": [
       { "id": "keychains", "name": "Keychains", "description": "..." }
     ],
     "products": [
       { "id": "keychain-1", "category": "keychains", ... }
     ]
   }
   ```

2. `src/pages/Shop.tsx` (if category filter exists)
   - Filter options will auto-update from categories array

---

### **Scenario 3: Modify Canvas Controls**

**Goal:** Add a "Flip Horizontal" button

**File:** `src/components/ImageCustomizer.tsx`

```tsx
// Add new function:
const flipHorizontal = () => {
  const activeObject = fabricCanvasRef.current?.getActiveObject();
  if (activeObject) {
    activeObject.set('flipX', !activeObject.flipX);
    fabricCanvasRef.current?.renderAll();
    updateCustomization();
  }
};

// Add button in controls section:
<Button
  variant="outline"
  onClick={flipHorizontal}
  disabled={!fabricCanvasRef.current?.getActiveObject()}
  size="icon"
>
  <FlipHorizontal className="h-4 w-4" />
</Button>
```

---

### **Scenario 4: Connect to Shopify API**

**File:** `src/lib/shopify/index.ts`

**Current (Mock):**
```typescript
export const getProducts = async (): Promise<Product[]> => {
  return productsData.products as Product[];
};
```

**Shopify Version:**
```typescript
const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

export const getProducts = async (): Promise<Product[]> => {
  const query = `
    query {
      products(first: 50) {
        edges {
          node {
            id
            title
            description
            priceRange { minVariantPrice { amount } }
            images(first: 1) { edges { node { url } } }
            metafields(identifiers: [{namespace: "custom", key: "material"}]) {
              value
            }
          }
        }
      }
    }
  `;
  
  const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query }),
  });
  
  const data = await response.json();
  return transformShopifyProducts(data.data.products.edges);
};
```

**Environment Variables:**
Create `.env` file:
```env
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-token-here
```

---

### **Scenario 5: Add New Page**

**Steps:**

1. **Create page component:** `src/pages/FAQ.tsx`
   ```tsx
   const FAQ = () => {
     return (
       <div className="container mx-auto py-12">
         <h1>Frequently Asked Questions</h1>
       </div>
     );
   };
   export default FAQ;
   ```

2. **Add route:** `src/App.tsx`
   ```tsx
   import FAQ from "./pages/FAQ";
   
   <Routes>
     {/* ...existing routes... */}
     <Route path="/faq" element={<FAQ />} />
     <Route path="*" element={<NotFound />} />
   </Routes>
   ```

3. **Add navigation link:** `src/components/Header.tsx`
   ```tsx
   <Link to="/faq">FAQ</Link>
   ```

---

## 🔌 Integration Points

### **1. Shopify Storefront API**

**Required Actions:**
- [ ] Set up Shopify store
- [ ] Create Storefront API access token
- [ ] Map Shopify product structure to `Product` interface
- [ ] Handle product variants (size, color, etc.)
- [ ] Store customization data in product metafields

**Reference:** [Shopify Storefront API Docs](https://shopify.dev/docs/api/storefront)

---

### **2. Payment Processing**

**Current:** None (mock cart)

**Recommended:** Shopify Checkout API

**Implementation:**
```tsx
// In Cart.tsx
const handleCheckout = async () => {
  const checkoutUrl = await createShopifyCheckout(getCart());
  window.location.href = checkoutUrl;
};
```

---

### **3. Image Storage**

**Current:** Base64 in localStorage (not scalable)

**Recommended:** 
- Cloudinary
- AWS S3
- Shopify Files API

**Flow:**
1. User finalizes customization
2. Upload canvas image to cloud storage
3. Store image URL in cart item
4. Pass URL to Shopify as line item property

---

### **4. Order Management**

**Current:** No order tracking

**Recommended:** 
- Shopify Order API
- Custom admin dashboard
- Email notifications via SendGrid/Mailgun

---

## 🚀 Development Workflow

### **Start Development Server**

```bash
bun run dev
# Opens at http://localhost:8080
```

### **Build for Production**

```bash
bun run build
# Output: dist/ folder
```

### **Preview Production Build**

```bash
bun run preview
```

### **Run Linter**

```bash
bun run lint
```

---

## 🧪 Testing Strategy (Recommended)

**Current State:** No tests

**Recommended Setup:**
```bash
bun add -d vitest @testing-library/react @testing-library/jest-dom
```

**Test Files to Create:**
- `ImageCustomizer.test.tsx` - Canvas operations
- `shopify/index.test.ts` - API mocking
- `ProductDetail.test.tsx` - User interactions
- `Cart.test.tsx` - Cart operations

---

## 📝 Code Conventions

### **Import Order**
1. React imports
2. Third-party libraries
3. Components (`@/components`)
4. Utilities (`@/lib`)
5. Types/Interfaces
6. Styles

### **Component Structure**
```tsx
// 1. Imports
import { useState } from "react";

// 2. Types/Interfaces
interface Props { ... }

// 3. Component
const Component = ({ prop }: Props) => {
  // 4. State
  const [state, setState] = useState();
  
  // 5. Effects
  useEffect(() => { ... }, []);
  
  // 6. Handlers
  const handleClick = () => { ... };
  
  // 7. Render
  return <div>...</div>;
};

// 8. Export
export default Component;
```

### **Naming Conventions**
- **Components:** PascalCase (`ProductCard.tsx`)
- **Functions:** camelCase (`getProducts()`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_UPLOAD_SIZE`)
- **Types:** PascalCase with `I` prefix optional (`Product` or `IProduct`)

---

## 🐛 Known Issues & TODOs

### **High Priority**
- [ ] Replace localStorage cart with Shopify Cart API
- [ ] Implement real product images (currently using placeholders)
- [ ] Add loading states for async operations
- [ ] Implement error boundaries
- [ ] Add form validation with Zod schemas

### **Medium Priority**
- [ ] Add unit tests
- [ ] Optimize Fabric.js canvas performance for mobile
- [ ] Implement image compression before upload
- [ ] Add accessibility (ARIA labels, keyboard navigation)
- [ ] SEO optimization (meta tags, sitemap)

### **Low Priority**
- [ ] Dark mode support (infrastructure exists, needs testing)
- [ ] Add more animation transitions
- [ ] Implement product reviews system
- [ ] Add wishlist feature

---

## 📚 Additional Resources

### **Official Documentation**
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Fabric.js Docs](http://fabricjs.com/docs/)
- [shadcn/ui Components](https://ui.shadcn.com/)

### **Project-Specific Patterns**
- Absolute imports with `@/` alias (configured in `tsconfig.json`)
- CSS variables for theming (see `src/index.css`)
- React Query for data fetching (see `src/App.tsx`)

---

## 🎯 Quick Reference Commands

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run linter
bun run lint

# Add new shadcn component
npx shadcn@latest add [component-name]
```

---

## 📞 Support & Contribution

**Questions?** Check the README.md for project overview

**Making Changes?** 
1. Create feature branch
2. Make changes with clear commit messages
3. Test locally with `bun run dev`
4. Build with `bun run build`
5. Submit PR with description

---

**Document Version:** 1.0  
**Last Reviewed:** November 2, 2025  
**Maintained By:** Development Team

---

*This document is your source of truth for understanding and editing this codebase. Keep it updated as the project evolves!* 🚀
