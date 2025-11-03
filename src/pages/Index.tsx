import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Layers, PackageCheck, PenTool, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { Category, Product, getCategories, getProducts } from "@/lib/shopify";

const heroStats = [
  { value: "1,200+", label: "Custom pieces shipped" },
  { value: "72h", label: "Average turnaround" },
  { value: "99%", label: "5-star feedback" },
];

const processSteps = [
  {
    title: "Define your vision",
    description: "Share reference art, brand marks, or a simple sketch and outline the purpose of your piece.",
    icon: PenTool,
  },
  {
    title: "Refine in our canvas",
    description: "Collaborate inside the customization canvas and preview precisely how your design will be etched.",
    icon: Layers,
  },
  {
    title: "We fabricate & deliver",
    description: "Premium materials, laser accuracy, sustainable finishes, and global shipping handled for you.",
    icon: PackageCheck,
  },
];

const materialHighlights = [
  {
    title: "Premium hardwoods",
    description: "Baltic birch, maple, and walnut sourced from certified mills for a refined grain and durable finish.",
    badge: "Hangers, signage, keepsakes",
  },
  {
    title: "Acrylic finishes",
    description: "Frosted, mirrored, and solid-color acrylics that shimmer under light—perfect for clocks and IDs.",
    badge: "Clocks, brand installs",
  },
  {
    title: "Hybrid builds",
    description: "Combine metals, veneer overlays, and layered silhouettes for dimensional statement pieces.",
    badge: "Installations, awards",
  },
];

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, cats] = await Promise.all([getProducts(), getCategories()]);
        setFeaturedProducts(products.slice(0, 3));
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const heroProduct = useMemo(() => {
    if (featuredProducts.length > 0) {
      return featuredProducts[0];
    }
    return {
      id: "hero",
      name: "Custom Name Hanger",
      category: "hangers",
      image: "/images/2.jpg",
      material: "Birch Plywood",
      price: 24.99,
      dimensions: "16\" x 8\"",
      description: "Elegant laser-cut silhouette with personal engraving and satin finish.",
      customizable: true,
    } as Product;
  }, [featuredProducts]);

  return (
    <div className="space-y-0">
      <section className="relative">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 h-[32rem] bg-gradient-aurora blur-3xl opacity-40" />
        <div className="container px-4 pb-16 pt-20 md:pt-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <div className="space-y-8">
              <Badge className="w-fit rounded-full border border-border/40 bg-background/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Bespoke fabrication
              </Badge>
              <div className="space-y-5">
                <h1 className="text-4xl font-heading font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Laser-cut art, signage, and keepsakes tailored to your story.
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Upload artwork, personalize in real-time, and collaborate with our fabrication team. We produce gallery-grade pieces that
                  deliver on detail, finish, and feeling.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/shop">
                  <Button variant="hero" size="lg" className="gap-2 shadow-glow">
                    Start a project
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="border-border/70 bg-background/80">
                    Learn about the studio
                  </Button>
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border/60 bg-card/70 p-4 shadow-soft">
                    <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -top-12 -right-12 -z-10 rounded-[3rem] bg-gradient-aurora opacity-50 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/80 shadow-soft">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(222_66%_21%/0.08),transparent_55%)]" />
                <img src={heroProduct.image} alt={heroProduct.name} className="h-full w-full object-cover" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-border/60 bg-background/80 p-5 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Featured build</p>
                      <p className="text-lg font-semibold text-foreground">{heroProduct.name}</p>
                    </div>
                    <span className="text-lg font-semibold text-accent">${heroProduct.price.toFixed(2)}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{heroProduct.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-background py-20">
        <div className="container px-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-3">
              <Badge className="w-fit rounded-full border border-border/60 bg-secondary/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Explore the collection
              </Badge>
              <h2 className="text-3xl font-heading font-semibold tracking-tight text-foreground md:text-4xl">
                Shop by form factor or start from a blank canvas.
              </h2>
              <p className="text-base text-muted-foreground">
                Product templates engineered for customization. Adjust dimensions, upload graphics, and preview engravings instantly.
              </p>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="h-11 border-border/70 bg-background/80">
                View full catalog
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-8 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative space-y-4">
                  <Badge className="rounded-full border border-border/40 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                    {category.name}
                  </Badge>
                  <h3 className="text-2xl font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Explore designs
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/60 py-20">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:items-center">
            <div className="space-y-4">
              <Badge className="w-fit rounded-full border border-border/50 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                How it works
              </Badge>
              <h2 className="text-3xl font-heading font-semibold tracking-tight text-foreground md:text-4xl">
                A collaborative process from concept to delivery.
              </h2>
              <p className="text-base text-muted-foreground">
                Our designers and fabrication experts guide you through every decision—ensuring your final piece feels intentional and ready to display.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="flex h-full flex-col gap-4 rounded-3xl border border-border/60 bg-background/80 p-6 text-left shadow-soft"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Step {index + 1}</p>
                      <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="border-t border-border/60 bg-background py-20">
        <div className="container px-4">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <Badge className="w-fit rounded-full border border-border/50 bg-secondary/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Featured work
              </Badge>
              <h2 className="text-3xl font-heading font-semibold tracking-tight text-foreground md:text-4xl">
                Recent custom builds leaving the studio.
              </h2>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="h-11 border-border/70 bg-background/80">
                View more pieces
              </Button>
            </Link>
          </div>

          <div className="mt-12">
            {loading ? (
              <div className="rounded-3xl border border-border/60 bg-card/60 p-12 text-center text-muted-foreground shadow-soft">
                Loading products...
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/70 py-20">
        <div className="container px-4">
          <div className="space-y-4">
            <Badge className="w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
              Material studio
            </Badge>
            <h2 className="max-w-2xl text-3xl font-heading font-semibold tracking-tight text-foreground md:text-4xl">
              Carefully selected substrates to elevate every project.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {materialHighlights.map((material) => (
              <div
                key={material.title}
                className="flex h-full flex-col gap-4 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-accent" />
                  {material.badge}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{material.title}</h3>
                <p className="text-sm text-muted-foreground">{material.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-gradient-to-br from-background via-background to-secondary/40 py-20">
        <div className="container px-4">
          <div className="grid gap-10 rounded-[3rem] border border-border/70 bg-card/80 p-10 shadow-soft lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-center lg:p-14">
            <div className="space-y-4">
              <Badge className="w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Let&apos;s collaborate
              </Badge>
              <h2 className="text-3xl font-heading font-semibold tracking-tight text-foreground md:text-4xl">
                Ready to bring a custom concept to life?
              </h2>
              <p className="text-base text-muted-foreground">
                Share a sketch or brief with our team and we&apos;ll guide you through materials, finishes, and production timelines—no design experience required.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/contact">
                  <Button variant="hero" className="shadow-glow">
                    Book a consultation
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="outline" className="border-border/70 bg-background/80">
                    Review your ideas
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-soft">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-muted-foreground">Trusted by makers</p>
                    <p className="text-base font-semibold text-foreground">Independent artists, studios, and brands.</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  “LaserCraft turned our hand-drawn concept into a finished installation in under a week. The detail and finishing elevated our launch space.”
                </p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">— Maya Chen, Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
