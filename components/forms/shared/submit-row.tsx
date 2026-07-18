export default function SubmitRow({ isPending }: { isPending: boolean }) {
  return (
    <div className="pt-4 border-t border-[#2e3a28]/10 flex items-center w-full justify-between">
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xs btn btn-primary px-6 py-3 h-12 font-manrope text-sm! tracking-widest font-black shadow-xs hover:bg-[#1f281b] transition-colors disabled:opacity-40 cursor-pointer"
      >
        {isPending ? "Submitting..." : "Register"}
      </button>
    </div>
  );
}
