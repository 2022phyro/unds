"use client";

import { Button } from "@/components/ui/bookmark-button/button";


export function HomeContactBlock() {
  return (
    <section className="w-full border-t border-border/40 bg-surface-muted/10 py-12 mt-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Left Side: Briefing / Physical Anchor (5 Columns) */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary block mb-1">
              Chamber Secretariat
            </span>
            <h4 className="text-lg font-bold tracking-tight text-text-primary">
              Official Correspondence
            </h4>
            <p className="mt-2 font-garamond text-xs italic text-text-muted max-w-sm leading-relaxed">
              Address inquiries regarding institutional logistics, public motion panels, or inter-collegiate collision scheduling directly to the registry desk.
            </p>
          </div>
          
          <div className="text-[11px] font-mono text-text-muted space-y-1 pt-4 border-t border-border/40">
            <div>LOC: SUB CHAMBERS / UNN</div>
            <div>EML: registry@unds.org</div>
          </div>
        </div>

        {/* Right Side: The Ultra-Minimalist Dispatch Field (7 Columns) */}
        <div className="md:col-span-7 bg-surface border border-border/80 rounded-xl p-5 sm:p-6 shadow-xs">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-text-secondary mb-1">
                  Return Address (Email)
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="name@domain.com"
                  className="w-full rounded-xs border border-border bg-surface-muted/20 px-3 py-2 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-text-secondary mb-1">
                  Subject Framework
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Tournament Invitation"
                  className="w-full rounded-xs border border-border bg-surface-muted/20 px-3 py-2 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-text-secondary mb-1">
                The Brief / Message Statement
              </label>
              <textarea 
                rows={3}
                required
                placeholder="State your position or request with clarity..."
                className="w-full rounded-xs border border-border bg-surface-muted/20 px-3 py-2 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] transition-colors resize-none font-body"
              />
            </div>

            <div className="flex justify-end pt-1">
              <Button type="submit" className="w-full sm:w-auto">
                Transmit Dispatch
              </Button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}