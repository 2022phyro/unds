export default function EventDetailsLoading() {
  return (
    <div className="w-full text-text-primary min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-start justify-start gap-3 sm:px-6 lg:px-8 space-y-16 animate-pulse">
        
        {/* ─── BREADCRUMB SKELETON ───────────────────────────────────────── */}
        <div className="pt-2 h-3 w-32 bg-surface rounded-xs" />

        {/* ─── HERO HEADER SKELETON ──────────────────────────────────────── */}
        <div className="w-full space-y-6 border-b border-[#2e3a28]/10 pb-10">
          <div className="space-y-3">
            <div className="h-4 w-16 bg-surface rounded-xs" />
            <div className="h-12 w-3/4 bg-surface rounded-xs" />
          </div>
          <div className="border-t grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-2 w-16 bg-surface rounded-xs" />
                <div className="h-4 w-24 bg-surface rounded-xs" />
              </div>
            ))}
          </div>
        </div>

        {/* ─── REGISTRATION CALLOUT SKELETON ─────────────────────────────── */}
        <div className="w-full h-40 bg-[#2e3a28]/5 border border-[#2e3a28]/10 rounded-xs" />

        {/* ─── OBJECTIVE SKELETON ────────────────────────────────────────── */}
        <div className="w-full space-y-4">
          <div className="h-8 w-48 bg-surface rounded-xs" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-surface rounded-xs" />
            <div className="h-4 w-full bg-surface rounded-xs" />
            <div className="h-4 w-2/3 bg-surface rounded-xs" />
          </div>
        </div>

        {/* ─── ELIGIBILITY SKELETON ──────────────────────────────────────── */}
        <div className="w-full space-y-4 border-t border-[#2e3a28]/10 pt-10">
          <div className="h-8 w-64 bg-surface rounded-xs" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-surface rounded-xs" />
            <div className="h-4 w-5/6 bg-surface rounded-xs" />
          </div>
        </div>

        {/* ─── SCHEDULE SKELETON ─────────────────────────────────────────── */}
        <div className="w-full space-y-6 border-t border-[#2e3a28]/10 pt-10">
          <div className="h-8 w-64 bg-surface rounded-xs" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-4 h-4 w-24 bg-surface rounded-xs" />
              <div className="md:col-span-8 space-y-2">
                <div className="h-5 w-48 bg-surface rounded-xs" />
                <div className="h-4 w-full bg-surface rounded-xs" />
              </div>
            </div>
          ))}
        </div>

        {/* ─── FAQ SKELETON ──────────────────────────────────────────────── */}
        <div className="w-full space-y-6 border-t border-[#2e3a28]/10 pt-10">
          <div className="h-8 w-24 bg-surface rounded-xs" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-24 bg-[#2e3a28]/5 border border-[#2e3a28]/10 rounded-xs" />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}