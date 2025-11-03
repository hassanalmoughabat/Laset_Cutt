import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product, addToCart } from "@/lib/shopify";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const handleQuickAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      id: `${product.id}-${Date.now()}`,
    });

    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border border-border/70 bg-card/80 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glow">
      <Link to={`/product/${product.id}`} className="relative block">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-metallic">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {product.customizable && (
              <Badge className="bg-background/80 text-xs font-semibold uppercase tracking-wider text-foreground">
                Custom ready
              </Badge>
            )}
            <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" />
              {product.material}
            </div>
          </div>
        </div>
      </Link>

      <CardContent className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-foreground transition-colors hover:text-accent">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-accent">${product.price.toFixed(2)}</span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">{product.dimensions}</span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 px-6 pb-6 pt-0">
        <Link to={`/product/${product.id}`} className="w-full">
          <Button variant="hero" className="group/button flex w-full items-center justify-center gap-2 shadow-glow">
            Design this piece
            <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Button>
        </Link>
        <Button variant="outline" className="w-full border-border/70 bg-background/80" onClick={handleQuickAdd}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};
