import Link from "next/link";
import Image from "next/image";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import {
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconBrandX,
IconBrandLinkedin,
} from "@tabler/icons-react";
import { BackToTop } from "./ui/back-to-top";
import { CornerClipButton } from "./corner-clip";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  // { href: "/testimonials", label: "Testimonials" },
  {
    href: "/Ottawa WUDC Debating & Judging Manual.pdf",
    label: "WUDC Debating Manual",
  },
];

const contactLinks = [
  { href: "https://wa.me/qr/7OO5DRWMWX6JF1", label: "WhatsApp", icon: IconBrandWhatsapp },
  { href: "https://www.instagram.com/undebatesociety", label: "Instagram", icon: IconBrandInstagram },
  { href: "https://x.com/UNDebateSociety", label: "Twitter", icon: IconBrandX },
  { href: "https://www.linkedin.com/company/university-of-nigeria-debating-society-unds/", label: "LinkedIn", icon: IconBrandLinkedin },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-primary/10 bg-surface/50 backdrop-blur-sm">
      <BackToTop />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-[2fr_0.7fr_1fr] lg:gap-12 lg:px-8">
        <div className="space-y-5 sm:col-span-2 lg:col-span-1">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                alt="UNDS Logo"
                width={100}
                height={100}
                className="h-10 w-10 shrink-0 object-contain sm:h-14 sm:w-14"
                priority
              />
              <p className="min-w-0 font-heading text-xl font-semibold leading-none text-primary-dark sm:text-2xl">
                University of Nigeria Debating Society
              </p>
            </div>
            <div className="flex flex-col items-start gap-6">
              <p className="max-w-md text-sm text-text-secondary">
                A home for curious minds, courageous voices, and meaningful
                conversations. Whether you're here to learn, to compete, or
                simply to explore new ideas, there's always a place for you at
                UNDS.
              </p>
              <CornerClipButton
                href="/join"
                className="w-full font-garamond sm:w-auto"
                aria-label="Join UNDS"
              >
                Join Today
              </CornerClipButton>
            </div>
          </div>
        </div>

        <div>
          <p className="text-left font-garamond text-xs font-bold  uppercase tracking-[0.28em] text-text-muted sm:text-left">
            Navigate
          </p>
          <div className="mt-4 grid gap-3">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="cursor-pointer text-sm text-text-primary transition-opacity hover:opacity-70"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-left font-garamond font-bold text-xs  uppercase tracking-[0.28em] text-text-muted sm:text-left">
            Contact
          </p>
          <div className="mt-4 grid gap-6 text-sm text-text-body">
            <div className="grid gap-2 flex flex-col gap-4">
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                <span>debate@unn.edu.ng</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                <span>+234 808 380 4754</span>
              </span>
              <span className="inline-flex items-start justify-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                <span className="wrap-break-word max-w-88 sm:max-w-none">
                  Fifth Year Classroom, Pharmacy Complex, University of Nigeria,
                  Nsukka Campus
                </span>
              </span>
              <span className="inline-flex items-start justify-start gap-2">
                <Calendar className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                <span>Fridays, 4:00pm-6:00pm</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-4">
              {contactLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    title={item.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-text-primary transition-opacity hover:opacity-70"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-text-primary" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary/10">
        <div className="mx-auto flex w-full flex-col gap-3 px-4 py-4 text-sm text-text-muted sm:flex-row sm:justify-end sm:px-6 lg:px-8">
          <p className="text-center sm:text-left">© 2026 UNDS Technical Team</p>
        </div>
      </div>
    </footer>
  );
}