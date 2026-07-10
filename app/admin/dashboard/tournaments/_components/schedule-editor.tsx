"use client";

import { useState } from "react";
import type { ScheduleSlot } from "@/lib/view-models/events";

export function ScheduleEditor({ name, initialRows }: { name: string; initialRows: ScheduleSlot[] }) {
  const [rows, setRows] = useState<ScheduleSlot[]>(
    initialRows.length ? initialRows : [{ time: "", segment: "", details: "" }],
  );

  function updateRow(index: number, field: keyof ScheduleSlot, value: string) {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  function addRow() {
    setRows((prev) => [...prev, { time: "", segment: "", details: "" }]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  function moveRow(index: number, direction: -1 | 1) {
    setRows((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(rows)} />
      {rows.map((row, index) => (
        <div key={index} className="border border-[#2e3a28]/10 p-3 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              value={row.time}
              onChange={(e) => updateRow(index, "time", e.target.value)}
              placeholder="Time"
              className="border border-[#2e3a28]/20 px-2 py-1.5 text-xs font-manrope focus:outline-hidden focus:border-[#2e3a28]"
            />
            <input
              value={row.segment}
              onChange={(e) => updateRow(index, "segment", e.target.value)}
              placeholder="Segment"
              className="border border-[#2e3a28]/20 px-2 py-1.5 text-xs font-manrope focus:outline-hidden focus:border-[#2e3a28]"
            />
            <input
              value={row.details}
              onChange={(e) => updateRow(index, "details", e.target.value)}
              placeholder="Details"
              className="border border-[#2e3a28]/20 px-2 py-1.5 text-xs font-manrope focus:outline-hidden focus:border-[#2e3a28]"
            />
          </div>
          <div className="flex gap-3 text-[10px] font-ui tracking-wider">
            <button type="button" onClick={() => moveRow(index, -1)} className="text-text-muted hover:text-[#2e3a28] cursor-pointer">
              Move up
            </button>
            <button type="button" onClick={() => moveRow(index, 1)} className="text-text-muted hover:text-[#2e3a28] cursor-pointer">
              Move down
            </button>
            <button type="button" onClick={() => removeRow(index)} className="text-red-700 cursor-pointer">
              Remove
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addRow} className="text-xs font-ui tracking-wider text-[#2e3a28] font-bold cursor-pointer">
        + Add schedule row
      </button>
    </div>
  );
}
