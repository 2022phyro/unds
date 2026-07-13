import HeroSection from "./hero-section";
import TESTIMONIALS from "./data/testimonials.json";
import WHAT_WE_DO from "./data/what-we-do.json";
import { TestimonialsCarousel } from "./testimonials-carousel";
import { ChamberGazette } from "./chamber-gazette";
import { HomeContactBlock } from "./contact-us";
import { NewsletterSignup } from "./newsletter-signup";
import { ChampionshipWins } from "./championship-win";
import { SectionReveal } from "@/components/ui/section-reveal";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white block opacity-100 visibility-visible">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 space-y-16">
        {/* HERO FOLD — Completely native, zero hidden states */}
        <SectionReveal>
          <HeroSection />
        </SectionReveal>

        {/* ACCOLADES SHOWCASE LEDGER — Plain HTML container avoids execution hangs */}
          <div className="border-b border-border py-16 flex flex-col gap-4">
            <div className="mb-12 lg:mb-20">
              <h2 className="mt-1 font-garamond text-lg text-text-primary font-semibold tracking-wide m-0">
                A Tradition of Excellence
              </h2>
            </div>

            <ChampionshipWins />
          </div>

        {/* OPERATIONS: PILLARS OF ADVOCACY */}
        <SectionReveal>
          <div className="border-b border-border py-16">
            <div className="mb-12">
              <h2 className="mt-1 font-garamond font-semibold text-lg text-text-primary tracking-wide m-0">
                What We Do
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 md:divide-x divide-border">
              {WHAT_WE_DO.map((pillar, index) => (
                <div
                  key={pillar.index}
                  className={`flex flex-col ${index === 0 ? "md:pr-8" : index === 1 ? "md:px-8" : "md:pl-8"}`}
                >
                  <span className="mb-2 font-mono text-xs font-bold text-accent">
                    0{pillar.index}
                  </span>
                  <h4 className="mb-2 text-text-primary font-playfair capitalize   tracking-wide m-0">
                    {pillar.title}
                  </h4>
                  <p className="font-body text-xs leading-relaxed text-text-secondary m-0">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* TESTIMONIALS REPUTATION MODULE */}
        <SectionReveal>
          <div className="border-b border-border py-16">
            <div className="mb-8">
              <h2 className="mt-1 text-lg font-garamond font-semibold text-text-primary tracking-wide m-0">
                Don't just take our word for it
              </h2>
            </div>
            <TestimonialsCarousel testimonials={TESTIMONIALS} />
          </div>
        </SectionReveal>

        {/* JOURNAL ARCHIVE DESK */}
        <SectionReveal>
          <div className="py-16">
            <div className="mb-8">
              <h2 className="mt-1 text-lg font-garamond font-semibold text-text-primary tracking-wide m-0">
                Trending
              </h2>
            </div>
            <ChamberGazette />
          </div>
        </SectionReveal>

        {/* NEWSLETTER SIGNUP */}
        <SectionReveal>
          <div className="py-16">
            <NewsletterSignup />
          </div>
        </SectionReveal>

        {/* OUTBOUND DISPATCH TERMINAL */}
        <div className="border-t border-border py-16">
          <HomeContactBlock />
        </div>
      </div>
    </div>
  );
}
