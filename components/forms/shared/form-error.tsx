// Add to ../shared alongside Field / SubmitRow / BaseFormProps:

export function FormError({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p className="text-sm font-manrope text-red-600 dark:text-red-400">
      {children}
    </p>
  );
}