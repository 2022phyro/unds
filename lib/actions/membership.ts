"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitMembershipApplication(formData: FormData) {
  // 1. Normalize data
  const email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  
  // 2. Normalize Filename for Cloudinary
  // Format: firstname_lastname_email.extension
  const file = formData.get("receipt") as File;
  const extension = file.name.split(".").pop();
  const safeFilename = `${firstName}_${lastName}_${email}`
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");
  
  const finalFilename = `${safeFilename}.${extension}`;
  
  // 3. Logic to upload file to Cloudinary would go here
  // const uploadedUrl = await uploadToCloudinary(file, finalFilename);

  // 4. Create User & Application Record
  const user = await db.user.create({
    data: {
      email,
      firstName,
      lastName,
      phone: formData.get("phone") as string,
      faculty: formData.get("faculty") as string,
      department: formData.get("department") as string,
      level: formData.get("level") as string,
      passwordHash: "PENDING_VERIFICATION", // Placeholder
    }
  });

  await db.membershipApplication.create({
    data: {
      userId: user.id,
      receiptUrl: "https://cloudinary.url/..." // Use uploadedUrl
    }
  });

  return { success: true };
}