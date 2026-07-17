"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-[#2e3a28] text-[#fcfaf7] py-4 font-bold tracking-widest uppercase text-sm hover:bg-[#1a2217] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Processing Application..." : "Submit Application →"}
    </button>
  );
}