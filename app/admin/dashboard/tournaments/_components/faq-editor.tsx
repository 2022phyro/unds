"use client";

import { useState } from "react";
import type { FaqEntry } from "@/lib/view-models/events";

export function FaqEditor({ name, initialRows }: { name: string; initialRows: FaqEntry[] }) {
  const [rows, setRows] = useState<FaqEntry[]>(initialRows.length ? initialRows : [{ q: "", a: "" }]);

  function updateRow(index: number, field: keyof FaqEntry, value: string) {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  function addRow() {
    setRows((prev) => [...prev, { q: "", a: "" }]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(rows)} />
      {rows.map((row, index) => (
        <div key={index} className="border border-[#2e3a28]/10 p-3 space-y-2">
          <input
            value={row.q}
            onChange={(e) => updateRow(index, "q", e.target.value)}
            placeholder="Question"
            className="w-full border border-[#2e3a28]/20 px-2 py-1.5 text-xs font-manrope focus:outline-hidden focus:border-[#2e3a28]"
          />
          <textarea
            value={row.a}
            onChange={(e) => updateRow(index, "a", e.target.value)}
            placeholder="Answer"
            rows={2}
            className="w-full border border-[#2e3a28]/20 px-2 py-1.5 text-xs font-manrope focus:outline-hidden focus:border-[#2e3a28] resize-none"
          />
          <button type="button" onClick={() => removeRow(index)} className="text-[10px] font-ui tracking-wider text-red-700 cursor-pointer">
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addRow} className="text-xs font-ui tracking-wider text-[#2e3a28] font-bold cursor-pointer">
        + Add FAQ row
      </button>
    </div>
  );
}
