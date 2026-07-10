import { z } from "zod";

export const albumSchema = z.object({
  slug: z.string().min(1, { error: "Slug is required." }),
  category: z.enum(["TOURNAMENTS", "TRAININGS", "SOCIALS", "AWARDS"]),
  year: z.coerce.number().int(),
  title: z.string().min(1, { error: "Title is required." }),
  subtitle: z.string().min(1, { error: "Subtitle is required." }),
  dateString: z.string().min(1, { error: "Date string is required." }),
  location: z.string().min(1, { error: "Location is required." }),
  imageUrl: z.url({ error: "Enter a valid image URL." }),
  cloudinaryFolder: z.string().min(1, { error: "Cloudinary folder is required." }),
  institutions: z
    .string()
    .optional()
    .transform((value) =>
      value
        ? value.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    ),
});
