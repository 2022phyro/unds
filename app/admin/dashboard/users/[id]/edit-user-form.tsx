"use client";

import { useActionState } from "react";
import { updateUser } from "@/lib/actions/admin";

export function EditUserForm({
  user,
  allGroups,
}: {
  user: any;
  allGroups: any[];
}) {
  const [state, action] = useActionState(updateUser.bind(null, user.id), {
    success: false,
    message: "",
  });
  const userGroupIds = user.memberships.map((m: any) => m.groupId);

  return (
    <form
      action={action}
      className="border border-[#2e3a28]/20 flex flex-col gap-6 p-8 "
    >
        {user.application && (
        <div className="bg-surface flex flex-col gap-3 p-4 border border-[#2e3a28]/10">
          <label className="font-bold uppercase text-xs tracking-widest block mb-2">Application Status</label>
          <select name="applicationStatus" defaultValue={user.application.status} className="w-full p-3 border border-primary ">
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="firstName"
          defaultValue={user.firstName}
          className="border p-3"
          placeholder="First Name"
        />
        <input
          name="lastName"
          defaultValue={user.lastName}
          className="border p-3"
          placeholder="Last Name"
        />
      </div>

      <input
        name="faculty"
        defaultValue={user.faculty}
        className="border p-3"
        placeholder="Faculty"
      />
      <input
        name="department"
        defaultValue={user.department}
        className="border p-3"
        placeholder="Department"
      />
      <input
        name="level"
        defaultValue={user.level}
        className="border p-3"
        placeholder="Level"
      />

      <label className="flex items-center gap-3 font-bold border p-3 cursor-pointer">
        <input type="checkbox" name="isStaff" defaultChecked={user.isStaff} />
        Grant Full Staff Access
      </label>

      <div className="border-t border-[#2e3a28]/10 pt-6">
        <h3 className="font-bold mb-4 uppercase text-xs tracking-widest">
          Memberships
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {allGroups.map((group) => (
            <label
              key={group.id}
              className="flex items-center gap-2 p-2 border hover:bg-[#2e3a28]/5 cursor-pointer"
            >
              <input
                type="checkbox"
                name="groups"
                value={group.id}
                defaultChecked={userGroupIds.includes(group.id)}
              />
              {group.name}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary p-3 font-bold py-6 tracking-widest"
      >
        Save Modifications
      </button>
      {state.message && (
        <p
          className={`text-sm font-bold ${state.success ? "text-green-800" : "text-red-800"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
