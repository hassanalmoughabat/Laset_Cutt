import { Mail, MapPin, Phone, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 pb-16 pt-20">
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <Badge className="mx-auto w-fit rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
            Let&apos;s collaborate
          </Badge>
          <h1 className="text-4xl font-heading font-semibold tracking-tight text-foreground sm:text-5xl">
            Tell us about your next project.
          </h1>
          <p className="text-lg text-muted-foreground">
            Fill out the details below and we&apos;ll reach out within one business day to discuss materials, pricing, and timelines.
          </p>
        </div>

        <div className="mt-16">
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            <Card className="border border-border/60 bg-card/70 shadow-soft">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Email our team</h3>
                    <a href="mailto:info@lasercraft.com" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      info@lasercraft.com
                    </a>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  We respond within 24 hours with material options, pricing, and next steps tailored to your brief.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-card/70 shadow-soft">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Call the workshop</h3>
                    <a href="tel:+1234567890" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      (123) 456-7890
                    </a>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Available Monday to Friday, 9 AM – 6 PM PST for quick material or timeline questions.</p>
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-card/70 shadow-soft">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Visit the studio</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Maker Street <br /> San Francisco, CA 94102
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Book an appointment to review samples, finishes, and production in person.</p>
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-card/70 shadow-soft">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-metallic text-foreground shadow-soft">
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Workshop hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Monday – Friday: 9 AM – 6 PM <br />
                      Saturday: 10 AM – 4 PM <br />
                      Sunday: Closed for fabrication resets
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
