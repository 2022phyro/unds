"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface LinkEntry {
  label: string;
  url: string;
}

export function LinksEditor({ name, initialRows = [] }: { name: string; initialRows: LinkEntry[] }) {
  const [rows, setRows] = useState<LinkEntry[]>(initialRows.length ? initialRows : [{ label: "", url: "" }]);

  function updateRow(index: number, field: keyof LinkEntry, value: string) {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  function addRow() {
    setRows((prev) => [...prev, { label: "", url: "" }]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {/* THIS IS THE KEY: This hidden input sends the data as one JSON string named "links" */}
      <input type="hidden" name={name} value={JSON.stringify(rows)} />
      
      {rows.map((row, index) => (
        <div key={index} className="flex gap-2 items-center border border-[#2e3a28]/10 p-3">
          <input
            value={row.label}
            onChange={(e) => updateRow(index, "label", e.target.value)}
            placeholder="Label (e.g. Rulebook)"
            className="flex-1 border border-[#2e3a28]/20 px-2 py-1.5 text-xs font-manrope"
          />
          <input
            value={row.url}
            onChange={(e) => updateRow(index, "url", e.target.value)}
            placeholder="https://..."
            className="flex-1 border border-[#2e3a28]/20 px-2 py-1.5 text-xs font-manrope"
          />
          <button 
            type="button" 
            onClick={() => removeRow(index)} 
            className="text-[10px] font-ui tracking-wider text-red-700 cursor-pointer"
          >
            Remove
          </button>
        </div>
      ))}
      <button 
        type="button" 
        onClick={addRow} 
        className="text-xs font-ui tracking-wider text-[#2e3a28] font-bold cursor-pointer"
      >
        + Add Link row
      </button>
    </div>
  );
}