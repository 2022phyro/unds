import Link from "next/link";
import Image from "next/image";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react";
import { BookmarkButton } from "./ui/bookmark-button";
import { Button } from "./ui/bookmark-button/button";
import { NewsletterForm } from "./newsletter-form";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/support", label: "Support" },
];

const contactLinks = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: IconBrandInstagram,
  },
  {
    href: "https://wa.me",
    label: "WhatsApp",
    icon: IconBrandWhatsapp,
  },
  {
    href: "https://x.com",
    label: "Twitter",
    icon: IconBrandX,
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: IconBrandFacebook,
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-primary/10 bg-surface/50 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:grid-cols-2 lg:grid-cols-[2fr_0.7fr_1fr] lg:gap-12 lg:px-8">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                alt="UNDS Logo"
                width={100}
                height={100}
                className="h-10 w-10 shrink-0 sm:h-14 sm:w-14"
              />
              <p className="min-w-0 font-heading text-xl sm:text-2xl font-semibold leading-none text-primary-dark">
                University of Nigeria Debating Society
              </p>
            </div>
            <div className="flex flex-col gap-6 items-start">
            <p className="max-w-md text-sm text-text-secondary">
              Building bridges, fostering dialogue, and cultivating the next generation of articulate leaders through debate and public speaking.
            </p>
            <Button className="font-garamond w-full sm:w-auto" aria-label="Join UNDS">
              Join Today
            </Button>
            </div>

          </div>
        </div>

        <div>
          <p className="font-garamond text-xs font-semibold uppercase tracking-[0.28em] text-text-muted text-center sm:text-left">
            Navigate
          </p>
          <div className="mt-4 grid gap-3">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-text-primary transition-opacity hover:opacity-70"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-garamond text-xs font-semibold uppercase tracking-[0.28em] text-text-muted text-center sm:text-left">
            Contact
          </p>
          <div className="mt-4 grid gap-4 text-sm text-text-body">
            <div className="grid gap-2">
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                <span>unds@unn.edu.ng</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                <span>+234 803 123 4567</span>
              </span>
              <span className="inline-flex items-start justify-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                <span className="break-words max-w-[22rem] sm:max-w-none">Fifth Year Classroom, Pharmacy Complex, University of Nigeria, Nsukka Campus</span>
              </span>
                <span className="inline-flex items-start justify-start gap-2">
                <Calendar className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                <span>Fridays, 4:00pm-6:00pm</span>
                </span>
            </div>
            <div className="flex gap-4 flex-wrap items-center justify-start">
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
                    className="text-text-primary transition-opacity hover:opacity-70"
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
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-center sm:text-left">© 2026 UNDS Technical Team</p>
        </div>
      </div>
    </footer>
  );
}