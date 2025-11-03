import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Phone, ShoppingCart, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getCart } from "@/lib/shopify";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navActive = location.pathname;

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return navActive === "/";
    }
    if (href === "/shop") {
      return navActive.startsWith("/shop") || navActive.startsWith("/category") || navActive.startsWith("/product");
    }
    return navActive.startsWith(href);
  };

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);
    return () => window.removeEventListener("cart-updated", updateCartCount);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        isScrolled ? "shadow-soft border-b border-border/70 bg-background/95 backdrop-blur" : "border-b border-transparent bg-background/80 backdrop-blur",
      )}
    >
      <div className="hidden md:block border-b border-border/60 bg-gradient-to-r from-accent/10 via-transparent to-transparent">
        <div className="container flex items-center justify-between px-4 py-2 text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Complimentary design review on every custom order.</span>
          </div>
          <a href="tel:+1234567890" className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors">
            <Phone className="h-3.5 w-3.5" />
            <span>(123) 456-7890</span>
          </a>
        </div>
      </div>

      <div className="container px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-aurora text-primary-foreground shadow-glow">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold tracking-tight text-foreground">LaserCraft Studio</span>
                <span className="text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
                  Precision &amp; Personalization
                </span>
              </div>
            </Link>
            <Badge variant="secondary" className="hidden md:inline-flex border-none bg-secondary/60 text-xs font-semibold text-foreground">
              Made to order
            </Badge>
          </div>

          <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/70 bg-card/80 p-1 shadow-soft">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                className={() =>
                  cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isLinkActive(item.href)
                      ? "bg-gradient-metallic text-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/cart" className="hidden md:flex">
              <Button variant="outline" className="relative gap-2 border-border/70 bg-background/70">
                <ShoppingCart className="h-4 w-4" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1.5 text-[0.65rem] font-bold uppercase tracking-tight text-accent-foreground">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/shop" className="hidden md:flex">
              <Button variant="hero" className="shadow-glow">
                Start a Project
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden border-border/70 bg-background/70">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-full flex-col gap-8 border-l border-border/60 bg-background/95 sm:w-[360px]">
                <div className="mt-10 flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <div className="mt-10 flex flex-col gap-2">
                  <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Navigate</span>
                  <div className="flex flex-col gap-1">
                    {navLinks.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <NavLink
                          to={item.href}
                          end={item.href === "/"}
                          className={() =>
                            cn(
                              "block rounded-lg px-3 py-2 text-base font-semibold transition-colors",
                              isLinkActive(item.href)
                                ? "bg-secondary/70 text-foreground"
                                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                            )
                          }
                        >
                          {item.label}
                        </NavLink>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border/70 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Your cart</span>
                    <Link to="/cart">
                      <SheetClose asChild>
                        <Button variant="outline" size="sm" className="gap-2 border-border/70">
                          <ShoppingCart className="h-4 w-4" />
                          {cartCount > 0 ? `${cartCount} items` : "Empty"}
                        </Button>
                      </SheetClose>
                    </Link>
                  </div>
                </div>

                <div className="mt-auto space-y-4 rounded-2xl border border-border/70 bg-secondary/40 p-5 shadow-soft">
                  <h3 className="text-lg font-semibold text-foreground">Ready to create?</h3>
                  <p className="text-sm leading-relaxed">
                    Upload your artwork or start with a guided concept session. We craft premium laser-cut pieces tailored to your story.
                  </p>
                  <SheetClose asChild>
                    <Link to="/shop">
                      <Button variant="hero" className="w-full shadow-glow">
                        Start a Project
                      </Button>
                    </Link>
                  </SheetClose>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+1234567890" className="hover:text-foreground transition-colors">
                      (123) 456-7890
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
