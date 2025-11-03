import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="max-w-lg rounded-[2.5rem] border border-border/60 bg-card/80 p-10 text-center shadow-soft">
        <Badge className="mx-auto mb-6 w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
          404
        </Badge>
        <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you&apos;re looking for has moved or no longer exists. Let&apos;s get you back to the studio.
        </p>
        <div className="mt-6 flex justify-center">
          <Link to="/">
            <Button variant="hero" className="shadow-glow">
              Return home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
