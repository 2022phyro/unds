"use server";

import { db } from "@/lib/db";
import { uploadReceiptToCloudinary } from "@/lib/cloudinary";

export async function submitMembershipApplication(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const file = formData.get("receipt") as File;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    // Cloudinary Upload
    const receiptUrl = await uploadReceiptToCloudinary(file, firstName, lastName, email);

    // Upsert User & Create Application
    const user = await db.user.upsert({
      where: { email },
      update: { firstName, lastName },
      create: {
        email,
        firstName,
        lastName,
        phone: formData.get("phone") as string,
        faculty: formData.get("faculty") as string,
        department: formData.get("department") as string,
        level: formData.get("level") as string,
        passwordHash: "PENDING_VERIFICATION",
      },
    });

    await db.membershipApplication.create({
      data: { userId: user.id, receiptUrl, status: "PENDING" }
    });

    return { 
      success: true, 
      message: "Application received.", 
      redirectUrl: "https://chat.whatsapp.com/LvI1vW1kB0f9L2EB3JgJ87?s=cl&p=a&ilr=1&amv=2" // Add your link here
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Registration failed. Please check your inputs." };
  }
}