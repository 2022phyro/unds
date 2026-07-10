"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/bookmark-button/button";
import { submitContactAction, type ContactActionState } from "@/lib/actions/contact";

const initialState: ContactActionState = {};

export function HomeContactBlock() {
  const [state, formAction, isPending] = useActionState(submitContactAction, initialState);

  return (
    <section className="w-full border-t border-border/40 bg-surface-muted/10 py-16 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Institutional Briefing (Takes 5 columns on large viewports, sits left-aligned) */}
        <div className="lg:col-span-5 space-y-4 text-left lg:sticky lg:top-8">
          <div>
            <span className="text-[10px] font-manrope font-bold tracking-[0.25em] text-text-secondary block mb-1">
              // Chamber Secretariat
            </span>
            <h3 className="text-3xl font-light tracking-tight text-text-primary font-garamond m-0">
              Inquiries
            </h3>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed max-w-xl m-0">
            Address inquiries regarding institutional logistics, public motion panels, or inter-collegiate debates directly to the registry desk via{" "}
            <span className="font-manrope text-xs font-semibold text-text-primary block sm:inline mt-1 sm:mt-0">
              registry@unn.edu.ng
            </span>
          </p>
          <div className="hidden lg:block pt-4 border-t border-border/40 text-[10px] font-manrope text-text-muted  tracking-wider">
                LOC: UNDS Secretariat // UNN
          </div>
        </div>

        {/* Right Side: The Fleshed-Out Input Desk Card (Takes 7 columns on large viewports) */}
        <div className="lg:col-span-7 w-full bg-surface border border-border/80 rounded-xl p-6 sm:p-8 shadow-xs text-left">
          {state.success ? (
            <p className="font-garamond text-sm text-text-primary py-8 text-center">
              Thank you — your message has been logged with the registry desk.
            </p>
          ) : (
          <form action={formAction} className="space-y-5 flex flex-col gap-3">

            {/* Identity Array Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="block font-garamond tracking-wider text-text-secondary  mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="e.g., Chidi"
                  className="w-full rounded-md border font-manrope font-light text-medium border-border bg-surface-muted/10 px-3 py-2.5 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block  font-garamond tracking-wider text-text-secondary  mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="e.g., Okafor"
                  className="w-full rounded-md border border-border bg-surface-muted/10 px-3 py-2.5 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] transition-colors"
                />
              </div>
            </div>

            {/* Matrix Tracking Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="block  font-garamond tracking-wider text-text-secondary  mb-1">
                  Return Address (Email)
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@domain.com"
                  className="w-full rounded-md border border-border bg-surface-muted/10 px-3 py-2.5 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block  font-garamond   tracking-wider text-text-secondary  mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="e.g., Debate Panel Inquiry"
                  className="w-full rounded-md border border-border bg-surface-muted/10 px-3 py-2.5 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] transition-colors"
                />
              </div>
            </div>

            {/* Message Frame Textarea */}
            <div className="flex flex-col gap-3">
                <label className="block font-garamond tracking-wider text-text-secondary  mb-1">
                Message
              </label>
              <textarea
                rows={5}
                name="message"
                required
                placeholder="Hi..."
                className="w-full rounded-md border border-border bg-surface-muted/10 px-3 py-2.5 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] transition-colors resize-none font-body leading-relaxed"
              />
            </div>

            {state.error && (
              <p className="text-xs font-manrope text-red-700">{state.error}</p>
            )}

            {/* Bottom Form Drawer Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/40">
              <span className="text-[10px] font-manrope text-text-muted  tracking-wider lg:hidden">
                LOC: UNDS Secretariat // UNN
              </span>
              <div className="hidden lg:block flex-1" />

              <Button type="submit" disabled={isPending} className="font-garamond tracking-wider w-40 font-bold">
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
          )}
        </div>

      </div>
    </section>
  );
}