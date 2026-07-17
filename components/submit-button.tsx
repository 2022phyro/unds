"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full btn btn-primary py-6 font-bold tracking-widest text-sm hover:bg-[#1a2217] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Processing Application..." : "Submit Application →"}
    </button>
  );
}