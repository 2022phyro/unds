"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUser(userId: string, prevState: any, formData: FormData) {
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        faculty: formData.get("faculty") as string,
        department: formData.get("department") as string,
        level: formData.get("level") as string,
      },
    });
    revalidatePath(`/admin/dashboard/users/${userId}`);
    return { success: true, message: "User updated successfully." };
  } catch (error) {
    return { success: false, message: "Failed to update user." };
  }
}

export async function deleteUser(userId: string) {
  await db.user.delete({ where: { id: userId } });
  revalidatePath("/admin/dashboard/users");
}