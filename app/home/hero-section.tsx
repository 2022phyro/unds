"use client";

import Link from "next/link";
import { HeroFireflies } from "@/components/fireflies";

export default function HeroSection() {
  return (
    <section
      className="
      relative
      isolate
      overflow-hidden
      min-h-screen
      border-b border-border
      flex items-center
      "
    >
      {/* Background */}
      <div
        className="
        absolute inset-0
        bg-cover
        bg-right
        bg-no-repeat
        "
        style={{
          backgroundImage: `
          linear-gradient(
            90deg,
            rgba(10,15,10,.98) 0%,
            rgba(10,15,10,.95) 42%,
            rgba(10,15,10,.72) 70%,
            rgba(10,15,10,.45) 100%
          ),
          url("/hero.jpg")
          `,
        }}
      />

      {/* Light mode overlay */}
      <div className="
      absolute
      inset-0
      dark:hidden
      "
      style={{
        background:
          "linear-gradient(90deg,#F2F1FA 0%,rgba(242,241,250,.96) 45%,rgba(242,241,250,.74) 72%,rgba(242,241,250,.28) 100%)",
      }}
      />

      <HeroFireflies />

      <div className="relative z-20 mx-auto max-w-7xl w-full px-8">

        <div className="max-w-3xl">

          <span
            className="
            uppercase
            tracking-[0.35em]
            text-xs
            font-semibold
            text-muted-foreground
            "
          >
            University of Nigeria Debating Society
          </span>

          <h1
            className="
            mt-6
            font-heading
            leading-[0.88]
            tracking-tight
            text-[clamp(4rem,8vw,7rem)]
            "
          >
            Welcome
            <br />
            to{" "}
            <span className="italic font-normal text-primary">
              UNDS.
            </span>
          </h1>

          <p
            className="
            mt-8
            max-w-2xl
            font-garamond
            italic
            text-[clamp(1.8rem,3vw,2.4rem)]
            leading-tight
            "
          >
            Home of intellectual discourse &
            competitive forensic excellence.
          </p>

          <p
            className="
            mt-8
            max-w-xl
            leading-8
            text-muted-foreground
            "
          >
            We forge analytical thinkers,
            master advocates and public
            leaders capable of competing on
            the world's most prestigious
            parliamentary debating circuits.
          </p>

          <div className="mt-12 flex gap-5">

            <Link
              href="/join"
              className="
              inline-flex
              h-14
              items-center
              px-8
              uppercase
              tracking-[.16em]
              font-semibold
              transition

              bg-[#21422E]
              text-[#F7F5EF]

              dark:bg-[#F7F5EF]
              dark:text-[#21422E]

              hover:scale-[1.02]
              active:scale-[.99]
              "
            >
              Register Today →
            </Link>

            <Link
              href="/about"
              className="
              inline-flex
              h-14
              items-center
              px-2
              text-sm
              underline-offset-8
              hover:underline
              "
            >
              Explore Society
            </Link>

          </div>

          <div
            className="
            mt-24
            flex
            justify-between
            text-[11px]
            uppercase
            tracking-[0.28em]
            text-muted-foreground
            "
          >
            <span>Since 2011</span>

            <span>Meet the Spartans</span>

          </div>

        </div>

      </div>

    </section>
  );
}