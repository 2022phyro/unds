import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1, { error: "First name is required." }),
  lastName: z.string().min(1, { error: "Last name is required." }),
  email: z.email({ error: "Enter a valid email address." }),
  subject: z.string().min(1, { error: "Subject is required." }),
  message: z.string().min(1, { error: "Message is required." }),
});
