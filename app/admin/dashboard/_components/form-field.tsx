interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
}

export function FormField({ label, name, type = "text", placeholder, defaultValue, required }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="font-ui text-[10px] tracking-widest text-text-muted">
        {label.toUpperCase()}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        className="w-full border border-[#2e3a28]/20 px-3 py-2 text-sm font-manrope focus:outline-hidden focus:border-[#2e3a28]"
      />
    </div>
  );
}
