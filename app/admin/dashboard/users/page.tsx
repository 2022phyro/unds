// app/admin/dashboard/users/page.tsx
import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<{ sort?: string }> }) {
  const { sort } = await searchParams;
  const order = sort === "desc" ? "desc" : "asc";

  const users = await db.user.findMany({ 
    include: { application: true, memberships: true },
    orderBy: { firstName: order } 
  });

  return (
    <main className="bg-surface min-h-screen p-12 font-serif text-text-primary">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-4xl font-bold">Users</h1>
        <Link href={`?sort=${order === "asc" ? "desc" : "asc"}`} className="underline text-sm opacity-70">
          Sort by Name ({order.toUpperCase()})
        </Link>
      </div>

      <div className="border border-[#2e3a28]/20 shadow-sm ">
        <table className="w-full text-left">
          <thead className="bg-[#2e3a28]/5 border-b border-[#2e3a28]/20">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#2e3a28]/10 hover:bg-[#2e3a28]/5">
                <td className="p-4 font-bold">{user.firstName} {user.lastName}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 text-xs font-bold uppercase">{user.application?.status || "NO APP"}</td>
                <td className="p-4 text-center">
                  <Link href={`/admin/dashboard/users/${user.id}`} className="underline font-bold">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}