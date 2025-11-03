import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem, getCart, removeFromCart, updateCartItem } from "@/lib/shopify";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("cart-updated", loadCart);
    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  const handleRemove = (itemId: string) => {
    removeFromCart(itemId);
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemove(itemId);
      return;
    }
    updateCartItem(itemId, newQuantity);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 pb-16 pt-20">
        <div className="space-y-4">
          <Badge className="w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
            Your cart
          </Badge>
          <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground sm:text-4xl">
            Ready to fabricate your custom pieces
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Review your artwork placements, adjust quantities, or add notes for our fabrication team. We&apos;ll follow up with any refinements before we cut.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-6 rounded-[3rem] border border-border/60 bg-card/70 p-16 text-center shadow-soft">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Your cart is empty</h2>
              <p className="text-sm text-muted-foreground">Upload artwork and start designing to see your pieces here.</p>
            </div>
            <Link to="/shop">
              <Button variant="hero" className="shadow-glow">
                Browse products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,0.3fr)]">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden border border-border/60 bg-card/70 shadow-soft">
                  <CardContent className="space-y-6 p-6">
                    <div className="grid gap-6 md:grid-cols-[minmax(0,0.3fr)_minmax(0,1fr)_minmax(0,0.2fr)] md:items-center">
                      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 bg-background/80">
                        {item.customization?.imageData ? (
                          <img
                            src={item.customization.imageData}
                            alt="Custom design preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="text-lg font-semibold text-foreground">{item.product.name}</h3>
                          <span className="rounded-full bg-background/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                            {item.product.material}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.product.material} • {item.product.dimensions}
                        </p>
                        <div className="text-base font-semibold text-accent">${item.product.price.toFixed(2)}</div>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-2 py-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                              −
                            </Button>
                            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                              +
                            </Button>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2 border-border/60" onClick={() => handleRemove(item.id)}>
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">Total</p>
                        <p className="mt-2 text-lg font-semibold text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {item.customization?.customObjects && item.customization.customObjects.length > 0 && (
                      <div className="rounded-2xl border border-border/60 bg-background/80 p-4 text-xs text-muted-foreground">
                        <p className="font-semibold text-foreground">Customization notes</p>
                        <p className="mt-1">
                          {item.customization.customObjects.length} design element{item.customization.customObjects.length > 1 ? "s" : ""} added. Our team will confirm placement before production.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="sticky top-28 border border-border/60 bg-card/80 shadow-soft">
                <CardContent className="space-y-6 p-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">Order summary</h2>
                    <p className="text-sm text-muted-foreground">
                      Shipping and taxes calculated during checkout. Custom review is included on every order.
                    </p>
                  </div>

                  <div className="space-y-3 border-t border-border/60 pt-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold text-foreground">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/60 pt-4">
                    <span className="text-base font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-semibold text-accent">${subtotal.toFixed(2)}</span>
                  </div>

                  <Button variant="hero" size="lg" className="w-full shadow-glow">
                    Proceed to checkout
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Checkout will be completed via Shopify. We&apos;ll email a proof if adjustments are needed.
                  </p>
                  <Link to="/shop" className="block">
                    <Button variant="outline" className="w-full border-border/60">
                      Continue designing
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border border-border/60 bg-background/80 shadow-soft">
                <CardContent className="space-y-3 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.32em] text-muted-foreground">Need adjustments?</p>
                  <p className="text-sm text-muted-foreground">
                    Reply to your order email within 24 hours and we&apos;ll refine placement or materials before we cut.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
