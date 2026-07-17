import Link from "next/link";
import {
  FileText,
  FileCheck2,
  ShieldCheck,
  Mic,
  Award,
  Crown,
  Shield,
  Users,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  Trophy,
  Wallet,
  Clock,
} from "lucide-react";
import { CornerClipButton } from "@/components/corner-clip";

export default function JoinPage() {
  const steps = [
    {
      icon: FileText,
      label: "Register",
      desc: "Submit your details and make the membership contribution.",
    },
    {
      icon: FileCheck2,
      label: "Upload Receipt",
      desc: "Upload your proof of payment to complete your application.",
    },
    {
      icon: ShieldCheck,
      label: "Review",
      desc: "Our team reviews your application and verifies your payment.",
    },
    {
      icon: Mic,
      label: "Interview",
      desc: "Eligible applicants are invited for an interview via email.",
    },
    {
      icon: Award,
      label: "Probation",
      desc: "A one-month period of training, meetings, and active participation.",
    },
    {
      icon: Crown,
      label: "Official Member",
      desc: "Successful probationers become full members and represent UNDS at tournaments.",
    },
  ];

  const guidelines = [
    {
      icon: Wallet,
      t: "Registration",
      d: "Begin your journey with a contribution of ₦2,000. This sustains our training resources and tournament logistics.",
    },
    {
      icon: Mic,
      t: "The Interview",
      d: "We welcome prospective members formally. Please arrive on time—it is the first metric of your professional commitment.",
    },
    {
      icon: Clock,
      t: "Probationary Period",
      d: "Our one-month probation is a bridge, not a barrier. Consistent participation is expected.",
    },
  ];

  const faqs = [
    {
      q: "Is the registration contribution refundable?",
      a: "The registration fee supports operational costs and is non-refundable.",
    },
    {
      q: "What is the probation process?",
      a: "It is a one-month period focused on training and integration into society activities.",
    },
    {
      q: "Is membership required for the community?",
      a: "No. Our public WhatsApp community is open to all students interested in debate.",
    },
  ];

  return (
    <main className="min-h-screen font-serif text-text-primary">
      {/* ─── HERO + PATH CHOOSER ────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-16 sm:py-24 text-center border-b border-[#2e3a28]/10 flex flex-col gap-4">
        <span className="text-xs uppercase tracking-[0.3em] text-text-muted mb-4 block">
          Unity. Voice. Impact.
        </span>
        <h1 className="text-4xl! sm:text-5xl! md:text-7xl! mb-4 leading-tight text-text-primary">
          Become a Spartan.
        </h1>
        <p className="text-lg sm:text-xl max-w-xl mx-auto leading-relaxed text-text-secondary mb-8">
          Whether you're ready to lead debates and represent UNDS, or you're
          just exploring, you belong here.
        </p>

        <div className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-text-muted mb-2">
          <span className="h-px w-10 bg-[#2e3a28]/20" />
          Choose Your Path
          <span className="h-px w-10 bg-[#2e3a28]/20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 text-left">
          {/* Member path — dark accent panel */}
          <div className="rounded-xs border border-[#2e3a28] bg-[color-mix(in_srgb,var(--surface)_70%,black)] p-8 flex flex-col items-center text-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-[#fcfaf7]/30">
              <Shield className="h-7 w-7 text-[#fcfaf7]" />
            </span>
            <h3 className="text-2xl! text-[#fcfaf7] leading-snug">
              I'm ready to
              <br />
              become a Member
            </h3>
            <p className="text-sm text-[#fcfaf7]/70 leading-relaxed">
              Go through our membership process, attend an interview, complete
              probation and become an official Spartan.
            </p>
            <Link
              href="/join/register"
              className="mt-2 inline-flex items-center gap-2 rounded-xs btn-primary text-(--btn-primary-text)!  px-6 py-3 text-sm font-bold  hover:bg-primary-dark transition-colors"
            >
              Begin Membership
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Community path — light panel */}
          <div className="rounded-xs border border-[#2e3a28]/20 bg-[color-mix(in_srgb,var(--surface)_95%,black)] p-8 flex flex-col items-center text-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-[#2e3a28]/25">
              <Users className="h-7 w-7 text-primary" />
            </span>
            <h3 className="text-2xl! text-text-primary leading-snug">
              Not Ready to
              <br />
              Become a Member?
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              You can still join our public community to meet members, ask
              questions, stay informed, and discover what UNDS is all about
              before applying for membership.
            </p>
            <a
              href="https://chat.whatsapp.com/LvI1vW1kB0f9L2EB3JgJ87?s=cl&p=a&ilr=1&amv=2"
              className="mt-2 inline-flex items-center gap-2 rounded-xs border border-[#2e3a28] px-6 py-3 text-sm font-bold text-text-primary hover:bg-[#2e3a28]/5 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Join the UNDS Community
            </a>
          </div>
        </div>
      </section>

      {/* ─── THE MEMBERSHIP JOURNEY ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-b border-[#2e3a28]/10 bg-[color-mix(in_srgb,var(--surface)_97%,black)] flex flex-col items-center">
        <div className="w-full px-4 sm:px-6 flex flex-col gap-6">
          <h2 className="text-2xl! sm:text-3xl! mb-4 sm:mb-16 text-center tracking-tight">
            The Membership Journey
          </h2>

          <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-start md:gap-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex md:flex-col items-start md:items-center gap-4 md:gap-3 w-full md:flex-1 relative text-left md:text-center"
              >
                {/* Connector: vertical dashed on mobile, horizontal dashed on desktop */}
                {i !== 0 && (
                  <div className="absolute left-8 -top-6 h-6 w-px border-l border-dashed border-[#2e3a28]/25 md:left-auto md:right-1/2 md:top-8 md:h-px md:w-full md:border-l-0 md:border-t" />
                )}

                <div className="shrink-0 flex flex-col items-center gap-2 md:w-full">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {i + 1}
                  </span>
                  <span className="w-14 h-14 rounded-full border border-primary flex items-center justify-center bg-surface z-10 shrink-0">
                    <step.icon size={22} />
                  </span>
                </div>

                <div className="md:w-full">
                  <span className="block text-sm font-playfair font-bold tracking-wide text-text-primary">
                    {step.label}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-text-secondary">
                    {step.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GUIDELINES + HONORARY / COMMUNITY ──────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16 sm:py-20 grid md:grid-cols-2 gap-12 md:gap-20">
        {/* Guidelines */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl! sm:text-3xl! mb-8 sm:mb-12">
            Membership Guidelines
          </h2>
          <div className="flex flex-col items-start gap-6 border-l border-[#2e3a28]">
            {guidelines.map((item, i) => (
              <div key={i} className="pl-6 flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#2e3a28]/25">
                  <item.icon className="h-3.5 w-3.5 text-primary" />
                </span>
                <div>
                  <h3 className="font-bold text-lg! mb-1 text-text-primary">
                    {item.t}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Honorary + Community */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xs bg-[color-mix(in_srgb,var(--surface)_70%,black)] p-8 sm:p-10 flex flex-col justify-center">
            <Trophy size={36} className="mb-6" />
            <h2 className="text-2xl! sm:text-3xl! mb-4 ">
              Honorary Membership
            </h2>
            <div className="space-y-4  leading-relaxed text-sm">
              <p>
                Outstanding speakers at UNDS-hosted tournaments and winners of
                competitions judged by UNDS may be granted honorary membership.
              </p>
            </div>
            {/* <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#fcfaf7] hover:opacity-80 transition-opacity"
            >
              Learn more about honorary membership
              <ArrowRight className="h-3.5 w-3.5" />
            </Link> */}
          </div>

          <a
            href="https://chat.whatsapp.com/LvI1vW1kB0f9L2EB3JgJ87?s=cl&p=a&ilr=1&amv=2"
            className="rounded-xs border border-[#2e3a28]/20 bg-[color-mix(in_srgb,var(--surface)_95%,black)] p-6 flex items-center gap-4 hover:border-[#2e3a28]/40 transition-colors"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#2e3a28]/25">
              <Users className="h-5 w-5 text-primary" />
            </span>
            <div className="flex-1">
              <h3 className="font-bold text-text-primary">
                Join the UNDS Community
              </h3>
              <p className="text-xs text-text-secondary">
                Be part of our vibrant WhatsApp community.
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-text-muted shrink-0" />
          </a>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 border-t border-[#2e3a28]/10">
        <div className="max-w-3xl! mx-auto px-6 flex flex-col gap-4">
          <h2 className="text-2xl! sm:text-3xl! mb-8 sm:mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border-b border-[#2e3a28]/10 pb-6"
              >
                <summary className="font-bold cursor-pointer flex justify-between items-center gap-4 text-base sm:text-lg text-text-primary">
                  {faq.q}
                  <ChevronDown
                    size={20}
                    className="shrink-0 text-text-muted group-open:rotate-180 transition-transform"
                  />
                </summary>
                <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER CTA ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 text-center flex flex-col gap-6 items-center">
        <h2 className="text-3xl! sm:text-4xl! mb-4 text-text-primary">
          Ready to begin?
        </h2>
        <CornerClipButton
          href="/join/register"
          className="text-lg sm:text-xl font-bold font-garamond! px-7 py-3"
        >
          Become a Spartan
        </CornerClipButton>
      </section>
    </main>
  );
}
