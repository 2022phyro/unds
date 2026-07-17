import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditUserForm } from "./edit-user-form";

export default async function AdminEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const [user, allGroups] = await Promise.all([
    db.user.findUnique({ 
        where: { id }, 
        include: { memberships: true, application: true } 
    }),
    db.group.findMany()
  ]);

  if (!user) notFound();

  return (
    <main className="bg-surface min-h-screen p-12 text-text-primary">
      <h1 className="text-3xl! mb-8 font-serif">Editing: {user.firstName} {user.lastName}</h1>
      <div className="max-w-2xl">
        <EditUserForm user={user} allGroups={allGroups} />
      </div>
    </main>
  );
}