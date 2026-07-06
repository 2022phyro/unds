import Image from "next/image";
import { SectionReveal } from "@/components/ui/section-reveal";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 space-y-28">
      
      {/* SECTION 1: HERO & HISTORIC ANCHOR */}
      <SectionReveal className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary block">
            Est. Legacy // UNDS
          </span>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            Our Foundation & Legacy
          </h1>
          <p className="text-base text-text-secondary leading-relaxed font-garamond">
            Founded to bridge the gap between raw eloquence and clinical analytical depth, the University of Nigeria Debating Society has grown from a localized circle of thinkers into one of Africa's premier collegiate forensics institutions. 
          </p>
          <p className="text-sm text-text-muted leading-relaxed font-body">
            Our origin is rooted in a simple mandate: to establish a rigorous intellectual training ground where students can cross-examine status-quo policies, defend structural truths, and represent the institution on national and global stages under intense competitive pressure.
          </p>
        </div>

        {/* Asymmetric Photo Frame Layer with Curation Placeholders */}
        <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative">
          <div className="col-span-7 relative h-56 sm:h-72 rounded-lg overflow-hidden border border-border bg-surface-muted/20 shadow-md group">
            <Image 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80" 
              alt="Collegiate Debate Assembly Lecture" 
              fill 
              className="object-cover filter grayscale opacity-90 transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
          <div className="col-span-5 relative h-44 sm:h-56 rounded-lg overflow-hidden border border-border bg-surface-muted/20 shadow-md self-end translate-y-6 group">
            <Image 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80" 
              alt="Academic Gavel and Glass Lens" 
              fill 
              className="object-cover filter grayscale opacity-90 transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        </div>
      </SectionReveal>

      {/* SECTION 2: LEDGER OF ACHIEVEMENTS */}
      <SectionReveal className="border-t border-border/40 pt-16">
        <div className="mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary block mb-1">
            The Record
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            Competitive Laurels
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { metric: "PAUDC Campaigns", desc: "Consistently breaking into elite knockout and elimination rounds at the Pan-African Universities Debating Championship." },
            { metric: "National Titles", desc: "Commanding top positions, individual public speaking laurels, and best speaker honors across major national opens." },
            { metric: "Continental Adjudication", desc: "Producing highly rated independent adjudicators selected to handle top-tier breaking rounds across Africa." }
          ].map((item, index) => (
            <div key={index} className="border border-border/60 bg-surface-muted/10 rounded-xl p-6 transition-all hover:bg-surface-muted/20">
              <span className="font-mono text-xs text-text-muted block mb-3">0{index + 1} //</span>
              <h3 className="font-garamond text-xl font-bold text-text-primary mb-2">{item.metric}</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* SECTION 3: THE FUNCTIONAL PILLARS */}
      <SectionReveal className="border-t border-border/40 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary block">
            Our Operations
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            What the Society Executes
          </h2>
          <p className="text-xs text-text-muted leading-relaxed font-body">
            Our weekly curriculum operates as an integrated intellectual circuit, sharpening minds across multiple disciplines of public discourse and policy analysis.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-6">
          {[
            { title: "Academic Debate (BP Format)", details: "Deep immersion into the British Parliamentary matrix. Members master rapid mechanism building, case extensions, and strategic policy clash targeting real-world geopolitical and socioeconomic friction layers." },
            { title: "Advanced Adjudication & Diagnostics", details: "Training the analytical judicial core. We break down the clinical science of evaluating arguments impartially, tracking complex debate trajectories, and rendering detailed structural verdicts." },
            { title: "Public Rhetoric & Oratory", details: "Refining the architecture of presentation. Focuses on drafting compelling content frameworks, speech layout optimization, and commanding large public platforms with precision." }
          ].map((pillar, idx) => (
            <div key={idx} className="group flex items-start gap-4 p-5 rounded-xl border border-border/40 bg-surface transition-all hover:border-border hover:shadow-xs">
              <span className="font-mono text-xs text-text-secondary pt-0.5">[{idx + 1}]</span>
              <div>
                <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-1 transition-transform duration-200 group-hover:translate-x-0.5">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-body">
                  {pillar.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* SECTION 4: THE DIALOGUE PANELS & SEMINARS TABLE */}
      <SectionReveal className="border-t border-border/40 pt-16">
        <div className="max-w-2xl mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary block mb-1">
            Asymmetric Discourse
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            Panel Sessions & Public Seminars
          </h2>
          <p className="mt-2 text-sm text-text-muted font-garamond italic">
            Beyond competitive rulesets, we hold strict structural panel dialogues examining systemic, geopolitical, and socio-economic frameworks.
          </p>
        </div>

        {/* Minimalist Tabular Layout Variant */}
        <div className="border border-border rounded-xl bg-surface overflow-hidden shadow-xs divide-y divide-border/60">
          {[
            { forum: "Geopolitical Collision Series", focus: "Global South sovereignty frameworks, border adjustments, and economic weaponization policies.", frequency: "Biannual Assembly" },
            { forum: "Socio-Legal Factoring Rounds", focus: "Analyzing judicial precedents, constitutional integrity anomalies, and structural tech ethics.", frequency: "Terminal Panel" },
            { forum: "Institutional Policy Seminars", focus: "Cross-examining university governance structures, micro-economic student adjustments, and education policy.", frequency: "Open Laboratory" }
          ].map((panel, idx) => (
            <div key={idx} className="group flex flex-col sm:flex-row sm:items-baseline gap-4 p-5 transition-colors hover:bg-surface-muted/10">
              <span className="text-xs font-mono font-bold tracking-wide text-text-secondary min-w-[140px] shrink-0">
                {panel.frequency}
              </span>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
                <h4 className="md:col-span-4 text-sm font-bold text-text-primary uppercase tracking-wide transition-transform duration-200 group-hover:translate-x-0.5">
                  {panel.forum}
                </h4>
                <p className="md:col-span-8 text-xs sm:text-sm text-text-secondary font-garamond leading-relaxed">
                  {panel.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* SECTION 5: GOVERNANCE & SECRETARIAT (Necessary Human Element) */}
      <SectionReveal className="border-t border-border/40 pt-16">
        <div className="mb-10 text-center md:text-left">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary block mb-1">
            Institutional Leadership
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            The Executive Secretariat
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { role: "President // Convener", name: "Executive Office", spec: "Strategic direction & institutional vision." },
            { role: "Chief Adjudicator", name: "Forensic Matrix", spec: "Curriculum engineering & tournament quality." },
            { role: "General Secretariat", name: "Chamber Logistics", spec: "External correspondence & asset locking." },
            { role: "Director of Training", name: "Oratory Laboratory", spec: "Rhetorical development & matter compilation." }
          ].map((member, idx) => (
            <div key={idx} className="group relative p-[2px] select-none rounded-xl overflow-hidden">
              {/* Backing structural outline block */}
              <div className="absolute inset-0 border border-border/60 rounded-xl bg-surface-muted/10 transition-colors group-hover:bg-surface-muted/30" />
              
              <div className="relative border border-border bg-surface rounded-xl p-5 text-center flex flex-col items-center h-full space-y-3">
                <div className="relative w-16 h-16 rounded-full border border-border overflow-hidden bg-surface-muted/30 grayscale">
                  <Image 
                    src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80`} 
                    alt={member.role}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-text-secondary block">
                    {member.role}
                  </span>
                  <h4 className="text-base font-bold text-text-primary font-garamond mt-0.5">
                    {member.name}
                  </h4>
                  <p className="text-[11px] text-text-muted mt-2 max-w-[180px] leading-normal font-body">
                    {member.spec}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

    </div>
  );
}