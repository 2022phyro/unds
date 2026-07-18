export default function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5 flex flex-col gap-1">
      <label className="block font-manrope text-sm text-text-secondary">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="w-full rounded-xs border border-gray-700  px-3 py-2 text-xs text-text-primary focus:outline-hidden focus:border-[#2e3a28] font-manrope transition-colors"
      />
    </div>
  );
}
