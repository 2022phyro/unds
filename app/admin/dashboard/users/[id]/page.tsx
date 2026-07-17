import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditUserForm } from "./edit-user-form";
import { CloudinaryImage } from "@/components/cl-image";

// Update the type signature to reflect that params is a Promise
export default async function AdminEditPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Await the params to resolve the ID
  const { id } = await params;

  const user = await db.user.findUnique({
    where: { id },
    include: { application: true }
  });

  if (!user) notFound();

  return (
    <main className="bg-[#fcfaf7] min-h-screen p-12 font-serif text-[#2e3a28]">
      <h1 className="text-3xl mb-8">Editing: {user.firstName} {user.lastName}</h1>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Edit Form */}
        <EditUserForm user={user} />

        {/* Right: Receipt Preview */}
        <div className="bg-white border border-[#2e3a28]/20 p-8">
          <h2 className="font-bold text-lg mb-4 uppercase tracking-widest text-xs">Receipt Image</h2>
          {user.application?.receiptUrl ? (
            <div className="relative w-full aspect-[3/4] border border-[#2e3a28]/10">
              <CloudinaryImage 
                src={user.application.receiptUrl} 
                alt="Payment Receipt" 
                className="object-contain"
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300">
              <p className="text-sm opacity-50">No receipt uploaded.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}