"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUser(userId: string, prevState: any, formData: FormData) {
  const isStaff = formData.get("isStaff") === "on";
  const groupIds = formData.getAll("groups") as string[];
const applicationStatus = formData.get("applicationStatus") as string; // New field

  try {
    await db.$transaction([
      db.user.update({
        where: { id: userId },
        data: {
          firstName: formData.get("firstName") as string,
          lastName: formData.get("lastName") as string,
          faculty: formData.get("faculty") as string,
          department: formData.get("department") as string,
          level: formData.get("level") as string,
          isStaff: isStaff,
          application: applicationStatus ? {
            update: { status: applicationStatus }
          } : undefined,
        },
      }),
      db.userToGroup.deleteMany({ where: { userId } }),
      db.userToGroup.createMany({
        data: groupIds.map((groupId) => ({ userId, groupId })),
      }),
    ]);

    revalidatePath(`/admin/dashboard/users/${userId}`);
    return { success: true, message: "User profile updated." };
  } catch (error) {
    return { success: false, message: "Failed to update user." };
  }
}

// app/admin/actions/users.ts
export async function deleteUser(formData: FormData) {
  const userId = formData.get("userId") as string;
  
  try {
    await db.user.delete({ where: { id: userId } });
    revalidatePath("/admin/dashboard/users");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to delete user." };
  }
}