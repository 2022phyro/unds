export default function AlbumsLoading() {
  return (
    <div className="w-full min-h-screen bg-surface px-3 sm:px-6 md:px-12 py-8 sm:py-12">
      {/* Editorial Status */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-[1px] w-12 bg-text-primary/20" />
        <span className="font-garamond text-[10px] uppercase tracking-[0.25em] text-text-muted">
          Curating moments…
        </span>
      </div>

      {/* Hero Placeholder: Editorial Header */}
      <div className="mb-12 h-[340px] sm:h-[420px] md:h-[480px] w-full bg-text-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>

      {/* Grid: Archival Print Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => {
          // Logic for varied aspect ratios to mimic a curated spread
          const ratios = ["aspect-[3/4]", "aspect-square", "aspect-[16/10]"];
          const ratio = ratios[i % ratios.length];

          return (
            <div 
              key={i} 
              className="group flex flex-col gap-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Print Placeholder: Sharp edges, no rounded pills */}
              <div className={`w-full bg-text-primary/5 relative overflow-hidden ${ratio}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              </div>
              
              {/* Caption Placeholders: Editorial style thin lines */}
              <div className="space-y-2">
                <div className="h-2 w-1/4 bg-text-primary/10" /> {/* Category */}
                <div className="h-4 w-3/4 bg-text-primary/20" /> {/* Title */}
                <div className="h-2 w-1/2 bg-text-primary/10" /> {/* Date/Meta */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}