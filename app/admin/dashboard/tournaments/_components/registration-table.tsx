"use client";

import Link from "next/link";
import { deleteRegistrationAction } from "@/lib/actions/registration";

interface TableColumn {
  header: string;
  accessorKey: string; // Changed from function to string
}

interface RegistrationTableProps {
  title: string;
  data: any[];
  columns: TableColumn[];
  type: "TEAM" | "ADJ" | "INDIVIDUAL" | "PS_REG" | "PS_ADJ";
  tournamentId: string;
  exportUrl?: string;
  exportLabel?: string;
}

export function RegistrationTable({ title, data, columns, type, tournamentId, exportUrl, exportLabel }: RegistrationTableProps) {
  
  // Logic to render specific cells based on the table type and key
  const renderCell = (item: any, key: string) => {
    const value = item[key];

    // Example logic for "TEAM" type
    if (type === "TEAM") {
      if (key === "teamName") return <span className="font-bold">{value}</span>;
      if (key === "player1") return `${item.player1Name} (${item.player1Email})`;
      if (key === "player2") return `${item.player2Name} (${item.player2Email})`;
    }

    // Default rendering
    return value;
  };

  return (
    <div className="space-y-4 border-t border-[#2e3a28]/10 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="font-garamond text-lg font-bold text-[#2e3a28]">{title}</h2>
        {exportUrl && (
          <a href={exportUrl} className="px-4 py-2 bg-[#2e3a28] text-white text-xs font-ui tracking-wider font-bold">
            {exportLabel ?? "Export CSV"}
          </a>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-manrope border border-[#2e3a28]/10">
          <thead>
            <tr className="border-b border-[#2e3a28]/10 font-ui tracking-wider text-text-muted">
              {columns.map((col, i) => <th key={i} className="p-2">{col.header}</th>)}
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="p-4 text-center text-text-muted">No registrations found.</td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b border-[#2e3a28]/5 hover:bg-[#2e3a28]/5">
                  {columns.map((col, i) => (
                    <td key={i} className="p-2">
                      {renderCell(item, col.accessorKey)}
                    </td>
                  ))}
                  <td className="p-2 flex gap-2">
                    <Link href={`/admin/dashboard/registrations/${item.id}/edit`} className="text-blue-600 font-bold">Edit</Link>
                    <form action={async (formData: FormData) => {
                      await deleteRegistrationAction(item.id, type, tournamentId);
                    }}>
                      <button type="submit" className="text-red-600 font-bold">Delete</button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}