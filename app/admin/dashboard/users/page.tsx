// app/admin/dashboard/users/page.tsx
import { DeleteButton } from "@/components/ui/delete-button";
import { deleteUser } from "@/lib/actions/admin";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const order = sort === "desc" ? "desc" : "asc";

  const users = await db.user.findMany({
    include: { application: true },
    orderBy: { firstName: order },
  });

  return (
    <main className="bg-surface min-h-screen p-8 font-serif text-text-primary">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Link
          href={`?sort=${order === "asc" ? "desc" : "asc"}`}
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          Sort by Name ({order.toUpperCase()})
        </Link>
      </div>

      <div className="overflow-hidden border border-black/10 rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/5 border-b border-black/10">
              <th className="p-4 font-bold">Name</th>
              <th className="p-4 font-bold">Email</th>
              <th className="p-4 font-bold">Status</th>
              <th className="p-4 font-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-black/5 hover:bg-black/[0.02]"
              >
                <td className="p-4">
                  {user.firstName} {user.lastName}
                </td>
                <td className="p-4 text-sm">{user.email}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded lowercase font-bold font-manrope ${user.application ? "bg-green-100 text-green-800" : "bg-gray-100 text-black"}`}
                  >
                    {user.application?.status || "NO APP"}
                  </span>
                </td>
                <td className="p-4 text-center text-manrope! flex justify-center gap-4">
                  <Link
                    href={`/admin/dashboard/users/${user.id}`}
                    className=" underline"
                  >
                    Edit
                  </Link>
                  <form
                    action={async (formData) => {
                      "use server";
                      await deleteUser(formData);
                    }}
                  >
                    {/* This passes the ID as plain text data, which never causes errors */}
                    <input type="hidden" name="userId" value={user.id} />
                    <DeleteButton />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
