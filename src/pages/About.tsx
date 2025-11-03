import { Link } from "react-router-dom";
import { Award, Factory, Heart, Layers, Leaf, Shield, Sparkles, Timer } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const studioValues = [
  {
    title: "Precision without compromise",
    description: "Industrial-grade lasers calibrated daily, ensuring cuts remain crisp even on intricate monograms and fine lettering.",
    icon: Shield,
  },
  {
    title: "Design-first mindset",
    description: "Our fabrication specialists collaborate with designers and founders to translate brand stories into tangible keepsakes.",
    icon: Sparkles,
  },
  {
    title: "Small batch friendly",
    description: "From one-off heirloom hangers to limited runs of desk plaques, we tailor production around your needs and schedule.",
    icon: Timer,
  },
  {
    title: "Sustainable sourcing",
    description: "We partner with FSC-certified suppliers and choose finishes that minimize waste while maximizing durability.",
    icon: Leaf,
  },
];

const materialLibrary = [
  {
    name: "Baltic birch & maple",
    description:
      "Tight grain patterns, flawless edges, and a natural warmth that makes every hanger or signage panel feel bespoke and premium.",
  },
  {
    name: "Architectural acrylics",
    description:
      "Frosted, mirrored, and matte acrylic stock that captures light beautifully—ideal for clocks, IDs, and lobby installations.",
  },
  {
    name: "Hybrid assemblies",
    description:
      "Layered finishes mixing wood veneers, metal hardware, and paint fills to add depth and contrast for awards or feature walls.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-card/70">
        <div className="container px-4 pb-16 pt-20">
          <div className="max-w-3xl space-y-5">
            <Badge className="w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
              Inside the studio
            </Badge>
            <h1 className="text-4xl font-heading font-semibold tracking-tight text-foreground sm:text-5xl">
              Precision fabrication meets collaborative design.
            </h1>
            <p className="text-lg text-muted-foreground">
              LaserCraft Studio exists to help creatives, founders, and event teams transform ideas into tangible experiences. We blend
              atelier craft with modern production so every piece feels intentional and lasting.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Founded</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">2021</p>
              <p className="text-xs text-muted-foreground">Born in San Francisco</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Pieces shipped</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">1,200+</p>
              <p className="text-xs text-muted-foreground">Across 14 countries</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Turnaround</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">3–5 days</p>
              <p className="text-xs text-muted-foreground">Average production window</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background py-16">
        <div className="container px-4">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-6 rounded-[2.5rem] border border-border/60 bg-card/80 p-8 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                  <Factory className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Our story</p>
                  <h2 className="text-2xl font-semibold text-foreground">From prototyping to bespoke production</h2>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                We started LaserCraft Studio in a shared maker space, crafting one-off wedding hangers and signage for friends. Word of mouth
                quickly grew as we obsessed over finishing details—sanding every edge, experimenting with layered veneers, and partnering
                closely with clients on design tweaks. That foundation still guides us: human collaboration backed by precise technology.
              </p>
              <p className="text-sm text-muted-foreground">
                Today we operate a dedicated workshop equipped with dual-bed laser systems, a finishing booth, and a small team of designers
                who thrive on translating sketches into fabrication-ready files.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground">What we do best</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>• Personalized hangers, signage, and keepsakes for weddings and events.</li>
                  <li>• Branded office accessories and ID systems crafted for modern teams.</li>
                  <li>• Statement wall clocks and installations engineered to spark conversation.</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground">How we collaborate</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  We treat every project as a partnership. Whether you bring a polished vector file or a quick phone sketch, our team refines
                  the design, simulates engraving depth, and recommends the right material stack to match your vision and timeline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-card/70 py-16">
        <div className="container px-4">
          <div className="space-y-4">
            <Badge className="w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
              Studio values
            </Badge>
            <h2 className="max-w-2xl text-3xl font-heading font-semibold tracking-tight text-foreground md:text-4xl">
              A small team with big respect for craft, people, and the planet.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {studioValues.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="flex h-full flex-col gap-4 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-soft">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background py-16">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] md:items-start">
            <div className="space-y-4">
              <Badge className="w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Materials we trust
              </Badge>
              <h2 className="text-3xl font-heading font-semibold tracking-tight text-foreground md:text-4xl">
                Curated substrates that elevate every piece.
              </h2>
              <p className="text-sm text-muted-foreground">
                We invest in materials that balance beauty and durability. Each project includes finish testing to ensure colors and grain
                patterns complement your design before we cut the full run.
              </p>
            </div>
            <div className="grid gap-6">
              {materialLibrary.map((material) => (
                <div key={material.name} className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-soft">
                  <h3 className="text-lg font-semibold text-foreground">{material.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{material.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-background via-background to-secondary/40 py-16">
        <div className="container px-4">
          <div className="grid gap-10 rounded-[3rem] border border-border/70 bg-card/80 p-10 shadow-soft md:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] md:items-center md:p-14">
            <div className="space-y-4">
              <Badge className="w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Let&apos;s build together
              </Badge>
              <h2 className="text-3xl font-heading font-semibold tracking-tight text-foreground md:text-4xl">
                Tell us about your next launch, event, or brand moment.
              </h2>
              <p className="text-base text-muted-foreground">
                We offer complimentary design consultations where we review your ideas, suggest material combinations, and outline a production timeline that fits.
              </p>
              <Link to="/contact">
                <Button variant="hero" className="shadow-glow">
                  Book a consultation
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 rounded-3xl border border-border/60 bg-background/80 p-8 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Trusted partners</h3>
                  <p className="text-sm text-muted-foreground">Creative studios, wedding planners, and boutique retailers across the globe.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                  <Heart className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Hand finished</h3>
                  <p className="text-sm text-muted-foreground">Every edge sanded, every engraving inspected, every package sealed with care.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                  <Layers className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Scale with confidence</h3>
                  <p className="text-sm text-muted-foreground">Whether you need one prototype or 300 units, we maintain detail and alignment across the batch.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
