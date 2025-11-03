import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Layers, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Category, getCategories } from "@/lib/shopify";

const Shop = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-card/70">
        <div className="container px-4 pb-16 pt-20">
          <div className="max-w-3xl space-y-5">
            <Badge className="w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
              Catalog
            </Badge>
            <h1 className="text-4xl font-heading font-semibold tracking-tight text-foreground sm:text-5xl">
              Start with a template or build your own composition.
            </h1>
            <p className="text-lg text-muted-foreground">
              Every category below includes dimension presets, engraving guidance, and live previews so you can iterate in minutes—not days.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Premium materials by default
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-accent" />
                Multi-layer engraving ready
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/about">
                <Button variant="outline" className="h-11 border-border/70 bg-background/80">
                  Explore our capabilities
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="hero" className="h-11 shadow-glow">
                  Talk with a specialist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          {loading ? (
            <div className="rounded-3xl border border-border/60 bg-card/60 p-12 text-center text-muted-foreground shadow-soft">
              Loading categories...
            </div>
          ) : categories.length === 0 ? (
            <div className="rounded-3xl border border-border/60 bg-card/60 p-12 text-center text-muted-foreground shadow-soft">
              No categories available yet. Check back soon.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link key={category.id} to={`/category/${category.id}`}>
                  <Card className="group h-full overflow-hidden border border-border/60 bg-card/70 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glow">
                    <CardHeader className="space-y-6">
                      <div className="space-y-3">
                        <CardTitle className="text-2xl font-semibold text-foreground">{category.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">{category.description}</CardDescription>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                        Templates ready
                      </div>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between border-t border-border/60 pt-4 text-sm font-semibold text-accent">
                      View products
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/60 py-16">
        <div className="container px-4">
          <div className="grid gap-8 rounded-3xl border border-border/70 bg-background/80 p-8 shadow-soft md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-center md:p-12">
            <div className="space-y-4">
              <Badge className="w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Need something unique?
              </Badge>
              <h2 className="text-3xl font-heading font-semibold tracking-tight text-foreground">
                We also fabricate installations, event signage, and limited edition runs.
              </h2>
              <p className="text-base text-muted-foreground">
                Share a concept with our fabrication team and we&apos;ll map out materials, timeline, and pricing in a collaborative workshop session.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contact">
                <Button variant="hero" className="shadow-glow">
                  Book a custom consult
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-border/70 bg-background/80">
                  View past collaborations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
