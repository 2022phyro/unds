export default function EventsRegistryLoading() {
  return (
    <div className="w-full flex flex-col text-text-primary">
      {/* Header Area */}
      <div className="px-4 sm:px-8 lg:px-20 pt-16">
        <div className="h-10 w-32 bg-text-primary/10 animate-fade-in-up" />
      </div>

      <div className="px-4 sm:px-8 lg:px-20 space-y-32 flex flex-col gap-8 pt-8">
        {/* Featured Event Placeholder */}
        <div className="w-full h-75 sm:h-87.5 border border-text-primary/10 bg-surface relative overflow-hidden animate-fade-in-up">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>

        {/* Controls Bar Placeholder */}
        <div className="h-14 w-full border border-text-primary/10 bg-surface animate-fade-in-up" style={{ animationDelay: '100ms' }} />

        {/* Events List Placeholder */}
        <div className="flex flex-col border border-text-primary/10 bg-surface overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-6 py-8 border-b border-text-primary/5 last:border-0">
              {/* Date Box */}
              <div className="h-12 w-14 bg-text-primary/5 shrink-0" />
              
              {/* Info Stack */}
              <div className="flex-1 space-y-3">
                <div className="h-3 w-24 bg-text-primary/10" />
                <div className="h-5 w-1/3 bg-text-primary/20" />
                <div className="h-3 w-1/4 bg-text-primary/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}