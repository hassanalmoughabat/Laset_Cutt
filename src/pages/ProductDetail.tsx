import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, PackageCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageCustomizer } from "@/components/ImageCustomizer";
import { Product, addToCart, getProductById } from "@/lib/shopify";

interface CustomizationData {
  imageData?: string;
  hasCustomization: boolean;
  customObjects: any[]; // To store positions and types of custom elements
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [customization, setCustomization] = useState<CustomizationData>({ hasCustomization: false, customObjects: [] });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const prod = await getProductById(id);
        setProduct(prod);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart({
        product,
        quantity: 1,
        customization: {
          imageData: customization.imageData,
          customObjects: customization.customObjects,
        },
        id: `${product.id}-${Date.now()}`,
      });

      toast.success("Added to cart!", {
        description: "Your customized product has been added to your cart.",
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error("Failed to add to cart", {
        description: "Please try again or check your connection.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 pb-16 pt-20">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>

        {loading ? (
          <div className="mt-16 rounded-3xl border border-border/60 bg-card/60 p-12 text-center text-muted-foreground shadow-soft">
            Loading product...
          </div>
        ) : !product ? (
          <div className="mt-16 rounded-3xl border border-border/60 bg-card/60 p-12 text-center shadow-soft">
            <h2 className="text-2xl font-semibold text-foreground">Product not found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              It may have been removed or is temporarily unavailable. Explore other templates in the shop.
            </p>
            <div className="mt-6">
              <Link to="/shop">
                <Button variant="hero" className="shadow-glow">
                  Return to shop
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.85fr)] lg:items-start">
            <div className="space-y-6">
              <Badge className="w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Live canvas
              </Badge>
              <div className="rounded-[2.5rem] border border-border/60 bg-card/70 p-6 shadow-soft">
                <ImageCustomizer productImage={product.image} onCustomizationChange={setCustomization} />
              </div>
              <div className="grid gap-4 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground">Canvas tips</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Upload transparent PNGs for best engraving results. We automatically convert artwork to laser-ready black.</li>
                  <li>Use the rotation and scaling tools to fine-tune placement. Everything is saved to your cart automatically.</li>
                  <li>Need help? Add a note in the cart and our designers will review alignment before fabrication.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <Badge className="w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Product spec
              </Badge>
              <div className="rounded-[2.5rem] border border-border/60 bg-card/80 p-8 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h1 className="text-4xl font-heading font-semibold tracking-tight text-foreground">{product.name}</h1>
                    <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">{product.category}</p>
                  </div>
                  <span className="rounded-2xl bg-background/80 px-4 py-2 text-2xl font-semibold text-accent">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <p className="mt-6 text-base text-muted-foreground">{product.description}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-4 text-sm">
                    <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Material</p>
                    <p className="mt-2 font-semibold text-foreground">{product.material}</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-4 text-sm">
                    <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Dimensions</p>
                    <p className="mt-2 font-semibold text-foreground">{product.dimensions}</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-4 text-sm">
                    <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Customizable</p>
                    <p className="mt-2 font-semibold text-foreground">{product.customizable ? "Yes" : "No"}</p>
                  </div>
                </div>

                <Button variant="hero" size="lg" className="mt-8 w-full shadow-glow" onClick={handleAddToCart}>
                  Add customized piece to cart
                </Button>
              </div>

              <div className="grid gap-6 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-soft md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-foreground">Design concierge</h3>
                    <p className="text-sm text-muted-foreground">
                      Need a hand refining layout or lettering? Drop a note in checkout and our designers will send adjustments before we cut.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                    <PackageCheck className="h-5 w-5 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-foreground">Fabrication &amp; shipping</h3>
                    <p className="text-sm text-muted-foreground">
                      Typical turnaround is 3–5 business days plus shipping. We pack every item with protective layers to keep engravings pristine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
