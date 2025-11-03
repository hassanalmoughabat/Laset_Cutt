import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Sparkles, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Shipping Policy", href: "#" },
  { label: "Returns & Refunds", href: "#" },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "LinkedIn", href: "#", icon: Linkedin },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/60 bg-background/90">
      <div className="container px-4 py-16">
        <div className="rounded-3xl border border-border/70 bg-card/80 p-8 shadow-soft md:p-12">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="space-y-5">
              <Badge variant="secondary" className="bg-secondary/80 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Custom to scale
              </Badge>
              <h2 className="text-3xl font-heading font-semibold tracking-tight text-foreground md:text-4xl">
                Bring your laser-cut ideas to life with atelier-level detail.
              </h2>
              <p className="max-w-xl text-base text-muted-foreground">
                From one-off heirloom pieces to small batch production, our team blends design support with precision cutting so every detail feels intentional.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contact">
                <Button variant="outline" className="h-11 whitespace-nowrap border-border/70 px-6">
                  Book a discovery call
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="hero" className="h-11 whitespace-nowrap px-6 shadow-glow">
                  Start a project
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-4">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-aurora text-primary-foreground shadow-glow">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-semibold text-foreground">LaserCraft Studio</span>
                <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Est. 2021</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              We are a design-led fabrication team turning sketches and brand marks into tangible products worth keeping.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:hello@lasercraft.com" className="hover:text-foreground transition-colors">
                  hello@lasercraft.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>123 Maker Street, San Francisco, CA</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all hover:border-accent/40 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Support</p>
            <ul className="mt-5 space-y-3 text-sm">
              {policyLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-3xl border border-border/60 bg-secondary/30 p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Workshop Journal</p>
            <h3 className="text-lg font-semibold text-foreground">Monthly inspiration &amp; production slots.</h3>
            <p className="text-sm text-muted-foreground">
              Be first to reserve fabrication time and access new materials dropping in the studio.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row">
              <Input type="email" placeholder="your@email.com" className="border-border/70 bg-background/80" />
              <Button type="submit" variant="hero" className="shadow-glow">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} LaserCraft Studio. Crafted with precision in California.</p>
          <p>Powered by sustainable materials and small batch production.</p>
        </div>
      </div>
    </footer>
  );
};
