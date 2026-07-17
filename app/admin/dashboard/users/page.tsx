import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminUsersPage() {
  const users = await db.user.findMany({ 
    include: { application: true },
    orderBy: { createdAt: "desc" } 
  });

  return (
    <main className="bg-surface min-h-screen p-12 font-serif">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-4xl!">Users</h1>
        <p className="opacity-60">{users.length} total registrations</p>
      </div>

      <div className="border border-[#2e3a28]/20 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#2e3a28]/5 border-b border-[#2e3a28]/20">
            <tr>
              <th className="p-4 font-bold">Name</th>
              <th className="p-4 font-bold">Email</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#2e3a28]/10 hover:bg-[#2e3a28]/5">
                <td className="p-4 font-bold">{user.firstName} {user.lastName}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span className="px-2 py-1  text-yellow-800 text-xs font-bold ">
                    {user.application?.status || "NO APP"}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <Link href={`/admin/dashboard/users/${user.id}`} className="underline font-bold hover:text-[#2e3a28]/70">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}