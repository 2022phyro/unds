"use client";

import { useActionState } from "react";
import { updateUser, deleteUser } from "@/lib/actions/admin";

export function EditUserForm({ user }: { user: any }) {
  const [state, action] = useActionState(updateUser.bind(null, user.id), { success: false, message: "" });

  return (
    <form action={action} className="bg-white border border-[#2e3a28]/20 p-8 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <input name="firstName" defaultValue={user.firstName} className="border p-3 w-full" />
        <input name="lastName" defaultValue={user.lastName} className="border p-3 w-full" />
      </div>
      <input name="faculty" defaultValue={user.faculty} className="border p-3 w-full" />
      <input name="department" defaultValue={user.department} className="border p-3 w-full" />
      <input name="level" defaultValue={user.level} className="border p-3 w-full" />
      
      <button type="submit" className="bg-[#2e3a28] text-white px-8 py-3 font-bold w-full">Save Changes</button>
      
      <div className="pt-8 mt-8 border-t border-red-100">
        <button 
          type="button" 
          onClick={() => { if(confirm("Delete user?")) deleteUser(user.id); }}
          className="text-red-800 underline text-sm font-bold"
        >
          Delete this user
        </button>
      </div>
      
      {state.message && <p className="text-sm font-bold">{state.message}</p>}
    </form>
  );
}