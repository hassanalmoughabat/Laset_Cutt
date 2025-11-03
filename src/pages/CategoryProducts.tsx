import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Category, Product, getCategories, getProductsByCategory } from "@/lib/shopify";

const CategoryProducts = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!category) return;
      setLoading(true);
      try {
        // Get products for this category
        const prods = await getProductsByCategory(category);
        setProducts(prods);

        // Get category info
        const cats = await getCategories();
        const catInfo = cats.find(c => c.id === category);
        setCategoryInfo(catInfo || null);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-card/70">
        <div className="container px-4 pb-16 pt-20">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:items-center">
            <div className="space-y-4">
              <Badge className="w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                {categoryInfo?.name || "Collection"}
              </Badge>
              <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {categoryInfo?.name ? `${categoryInfo.name} built around your brand.` : "Category catalog"}
              </h1>
              <p className="text-base text-muted-foreground">
                {categoryInfo?.description ||
                  "Discover customizable templates with engraving guides, layered cut paths, and premium material suggestions ready to ship."}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/contact">
                  <Button variant="outline" className="h-11 border-border/70 bg-background/80">
                    Request bespoke sizing
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button variant="hero" className="h-11 shadow-glow">
                    Browse all categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-[2.5rem] border border-border/60 bg-background/80 p-8 shadow-soft">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">What&apos;s inside</p>
                    <p className="text-sm text-muted-foreground">
                      Dimensional presets, recommended materials, and engraving offset suggestions curated by our fabrication team.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                  <div className="rounded-2xl border border-border/60 bg-card/80 p-4 text-center">
                    <p className="text-2xl font-semibold text-foreground">{products.length}</p>
                    <p>Templates</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-card/80 p-4 text-center">
                    <p className="text-2xl font-semibold text-foreground">4</p>
                    <p>Material combos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          {loading ? (
            <div className="rounded-3xl border border-border/60 bg-card/60 p-12 text-center text-muted-foreground shadow-soft">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="grid gap-8 rounded-3xl border border-border/60 bg-card/70 p-12 text-center shadow-soft">
              <p className="text-lg font-semibold text-foreground">We&apos;re preparing new templates.</p>
              <p className="text-sm text-muted-foreground">
                Join the workshop journal to get notified when new designs drop for this category.
              </p>
              <Link to="/contact" className="mx-auto">
                <Button variant="hero" className="shadow-glow">
                  Notify me first
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryProducts;
