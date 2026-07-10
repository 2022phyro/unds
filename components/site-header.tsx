"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BookmarkButton, Button } from "@/components/ui/bookmark-button";
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

  const isActive = (href: string) => pathname === href;

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
      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden  border px-4 py-3 transition-all duration-300 ${
            scrolled
              ? "border-white/40 shadow-[0_10px_35px_rgba(0,0,0,0.08)]  bg-[color-mix(in_srgb,var(--surface)_92%,black)] backdrop-blur-2xl"
              : "border-transparent bg-inherit"
          }`}
        >
          <div className="absolute inset-x-[10%] bottom-0 h-px bg-primary/70" />

          <div className="relative flex items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="UNDS home"
              className="flex items-center gap-1 text-text-primary transition-opacity hover:opacity-85"
            >
              <span className="grid h-11 w-11 place-items-cente ring-white/60">
                <Image
                  src="/logo.png"
                  alt="UNDS logo"
                  width={120}
                  height={100}
                  priority
                />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-heading text-xl text-text-primary font-semibold sm:text-xl">
                  University of Nigeria Debating Society
                </span>
              </span>
            </Link>

            <nav
              className="font-garamond hidden items-center gap-7 lg:flex"
              aria-label="Primary"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative text-sm font-garamond uppercase tracking-[0.18em] transition-[color,font-weight,opacity] duration-300 ease-out ${
                    isActive(item.href)
                      ? "text-text-primary font-bold"
                      : "text-text-primary/85 hover:text-text-primary font-light"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <ThemeToggle />
              <BookmarkButton variant={"filled"} className="font-garamond">
                Join Today
              </BookmarkButton>
            </nav>

            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary  lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {menuOpen ? (
            <div
              id="mobile-navigation"
              className="mt-4 border-t border-white/30 pt-4 lg:hidden"
            >
              <nav className="grid gap-3" aria-label="Mobile">
                <ThemeToggle />

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative inline-flex w-fit flex-col gap-1 px-1 py-2 font-ui text-sm font-semibold uppercase tracking-[0.16em] text-text-primary after:content-[''] ${
                      isActive(item.href)
                        ? "before:absolute before:left-0 before:top-2 before:h-[70%] before:w-px before:bg-primary/55 after:block after:h-px after:w-[60%] after:bg-primary/70"
                        : "after:block after:h-px after:w-[60%] after:bg-primary/35"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button className="w-full h-12 font-garamond">
                  Join us
                </Button>
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
