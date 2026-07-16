"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CornerClipButton } from "./corner-clip";
import ThemeToggle from "./ui/theme-toggle/theme-toggle";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  // { href: "/support", label: "Support" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      setScrolled(currentScrollY > 12);

      if (menuOpen) {
        setVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY <= 12) {
        setVisible(true);
      } else if (delta > 8) {
        setVisible(false);
      } else if (delta < -8) {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* No fixed height / overflow-hidden here — this wrapper needs to
          grow to fit the mobile dropdown when it's open. */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-[color-mix(in_srgb,var(--surface)_92%,black)] shadow-[0_10px_35px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
            : "border-transparent bg-inherit"
        }`}
      >
        {/* Top bar — this is the only part with a fixed height */}
        <div className="relative flex h-17.5 items-center justify-between gap-4 pr-4">
          <div className="absolute inset-x-[10%] bottom-0 hidden h-[1.6px] bg-text-primary lg:flex!" />

          <Link
            href="/"
            aria-label="UNDS home"
            className="flex h-full items-center gap-1 pl-3 text-text-primary transition-opacity hover:opacity-85"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center">
              <Image
                src="/logo.png"
                alt="UNDS logo"
                width={120}
                height={120}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-playfair text-xl font-semibold text-text-primary">
                <span className="hidden md:inline min-[1030px]:text-lg! min-[1130px]:text-xl!">
                  University of Nigeria Debating Society
                </span>
                <span className="md:hidden min-[500px]:flex min-[500px]:text-2xl">
                  UNDS
                </span>
              </span>
            </span>
          </Link>

          <nav
            className="hidden h-full items-center gap-7 font-garamond lg:flex"
            aria-label="Primary"
          >
            {/* Only the link cluster stretches full height — needed so the
                tick can be pinned to each link's own bottom edge, which
                lines up with the header's bottom border regardless of
                header height. ThemeToggle / CTA stay self-centered. */}
            <div className="flex h-full items-stretch gap-7">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative pt-5 bottom gap-0 flex h-full flex-col items-center text-sm font-garamond uppercase tracking-[0.18em] transition-[color,font-weight,opacity] duration-300 ease-out ${
                      active
                        ? "font-bold text-text-primary"
                        : "font-light text-text-primary hover:text-text-primary"
                    }`}
                  >
                    {/* label takes the remaining space and centers itself
                        within it, so the tick below is always flush
                        against both the text and the header's bottom edge */}
                    <span className="flex flex-1 items-center p-0">{item.label}</span>
                    <span
                      aria-hidden
                      style={{ transformOrigin: "bottom" }}
                      className={`h-4 w-px bg-text-primary transition-all duration-300 ease-out ${
                        active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
            <ThemeToggle />
            <CornerClipButton href="/join" className="font-garamond">
              Join Today
            </CornerClipButton>
          </nav>

          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen ? (
          <div
            id="mobile-navigation"
            className="flex flex-col items-start justify-center gap-6 border-t border-white/30 px-3 pt-4 pb-6 lg:hidden"
          >
            <div className="self-end">
              <ThemeToggle />
            </div>

            <div className="relative pl-4">
              <span
                aria-hidden
                className="absolute inset-y-1 left-0 w-px bg-primary/20"
              />
              <div className="grid gap-3">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative inline-flex w-fit items-center py-1 font-ui text-sm font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                        active ? "text-text-primary" : "text-text-primary/70"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span
                        aria-hidden
                        className={`absolute top-1/2 -left-4 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-transform duration-300 ${
                          active ? "scale-100" : "scale-0"
                        }`}
                      />
                      <span
                        aria-hidden
                        style={{ transformOrigin: "left" }}
                        className={`absolute top-1/2 -left-4 h-px w-3 -translate-y-1/2 bg-primary transition-transform duration-300 ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <CornerClipButton
              href="/join"
              className="h-12 w-full font-garamond"
              onClick={() => setMenuOpen(false)}
            >
              Join us
            </CornerClipButton>
          </div>
        ) : null}
      </div>
    </header>
  );
}