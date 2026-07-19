export default function EventsRegistryLoading() {
  return (
    <div className="w-full flex flex-col gap-3 text-text-primary animate-pulse">
      <div className="px-4 sm:px-8 lg:px-20 pt-16 space-y-32">
        <div className="h-10 w-40 rounded-xs bg-surface" />
      </div>

      <div className="px-4 sm:px-8 lg:px-20 space-y-32 flex flex-col gap-8">
        <div className="w-full h-56 sm:h-64 rounded-xs border border-[#2e3a28]/15 bg-[#2e3a28]/5" />

        <div className="flex flex-col gap-3 pt-10 w-full">
          <div className="h-6 w-40 rounded-xs bg-surface" />
          <div className="h-14 w-full rounded-xs bg-surface/50 border border-surface" />
          <div className="flex flex-col border border-[#2e3a28]/15 rounded-xs overflow-hidden divide-y divide-surface">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-6 px-6 py-5">
                <div className="h-10 w-14 rounded-xs bg-surface shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 rounded-xs bg-surface" />
                  <div className="h-4 w-2/3 rounded-xs bg-surface" />
                  <div className="h-3 w-1/3 rounded-xs bg-surface" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}