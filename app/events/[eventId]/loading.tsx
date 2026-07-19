export default function EventDetailsLoading() {
  return (
    <div className="w-full  text-text-primary min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-start justify-start gap-3 sm:px-6 lg:px-8 space-y-16 animate-pulse">
        <div className="h-3 w-32 rounded-xs bg-surface" />

        <div className="w-full space-y-6 border-b flex flex-col gap-3 border-surface pb-10">
          <div className="space-y-3">   
            <div className="h-5 w-24 rounded-xs bg-surface" />
            <div className="h-10 w-3/4 rounded-xs bg-surface" />
          </div>
          <div className="border-t grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-2.5 w-16 rounded-xs bg-surface" />
                <div className="h-3.5 w-24 rounded-xs bg-surface" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-32 rounded-xs bg-[#2e3a28]/5 border border-surface" />

        <div className="w-full space-y-3">
          <div className="h-6 w-40 rounded-xs bg-surface" />
          <div className="h-4 w-full rounded-xs bg-surface" />
          <div className="h-4 w-5/6 rounded-xs bg-surface" />
        </div>
      </div>
    </div>
  );
}