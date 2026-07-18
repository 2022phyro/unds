export default function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4 space-y-6 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-[58px] rounded-xs bg-[#2e3a28]/5" />
        <div className="h-[58px] rounded-xs bg-[#2e3a28]/5" />
      </div>
      <div className="h-[58px] rounded-xs bg-[#2e3a28]/5" />
      <div className="h-12 rounded-xs bg-[#2e3a28]/10" />
    </div>
  );
}