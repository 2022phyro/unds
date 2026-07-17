"use client";

import { useState } from "react";

export function FileUploadField({ theme }: { theme: { border: string } }) {
  const [fileName, setFileName] = useState<string | null>(null);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  
  if (file && file.size > 500 * 1024) {
    alert("File is too large! Please choose a file under 500kb.");
    setFileName(null);
    e.target.value = ""; // Clear the input
    return;
  }
  
  setFileName(file ? file.name : null);
};

  return (
    <div className={`border-2 border-dashed ${theme.border} p-8 text-center bg-surface transition-colors`}>
      <label className="cursor-pointer">
        {fileName ? (
          // Visual feedback when a file is selected
          <div className="flex flex-col items-center gap-2">
            <span className="block font-bold text-sm text-[#2e3a28]">✓ File Selected:</span>
            <span className="text-xs italic bg-black/5 px-2 py-1 rounded">{fileName}</span>
            <span className="text-[10px] underline opacity-50">Click to change</span>
          </div>
        ) : (
          // Default state
          <>
            <span className="block font-bold mb-1">Upload Proof of Payment *</span>
            <span className="text-xs opacity-60">PNG, JPG, PDF (Max 500kb)</span>
          </>
        )}
        
        <input 
          type="file" 
          name="receipt" 
          className="hidden" 
          accept=".pdf,.jpg,.png" 
          required 
          onChange={handleFileChange} 
        />
      </label>
    </div>
  );
}