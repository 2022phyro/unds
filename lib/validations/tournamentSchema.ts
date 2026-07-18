import { z } from "zod";

function parseJsonArray(label: string) {
  return z.string().transform((value, ctx) => {
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) throw new Error("not an array");
      return parsed;
    } catch {
      ctx.addIssue({ code: "custom", message: `${label} must be a valid JSON array.` });
      return z.NEVER;
    }
  });
}

export const tournamentSchema = z.object({
  slug: z.string().min(1, { error: "Slug is required." }),
  type: z.enum(["INTERNAL_HOST", "EXTERNAL_MAJOR", "RECURRING_LOOP"]),
  status: z.enum(["REGISTRATION_OPEN", "REGISTRATION_LOCKED", "COMPLETED", "ONGOING", "CLOSING_SOON"]),
  statusText: z.string().min(1, { error: "Status text is required." }),
  scopeText: z.string().min(1, { error: "Scope text is required." }),
  title: z.string().min(1, { error: "Title is required." }),
  description: z.string().min(1, { error: "Description is required." }),
  debateFormat: z.string().min(1, { error: "Debate format is required." }),
  deliveryMode: z.enum(["ONLINE", "OFFLINE", "HYBRID"]),
  location: z.string().min(1, { error: "Location is required." }),
  dateString: z.string().min(1, { error: "Date string is required." }),
  sortDate: z.coerce.date({ error: "Enter a valid date." }),
  deadlineText: z
    .string()
    .optional()
    .transform((value) => (value ? value : undefined)),
  registrationUrl: z
    .string()
    .optional()
    .transform((value) => (value ? value : undefined)),
  registrationType: z.enum(["NONE", "INDIVIDUAL", "TEAM"]),
  adjudicatorPolicy: z.enum(["N_PLUS_ONE", "FIXED", "NONE"]),
  fixedAdjudicatorCount: z.coerce.number().int().optional(),
  includesPS: z
    .union([z.literal("on"), z.undefined()])
    .optional()
    .transform((value) => value === "on"),
  psAdjudicatorsAllowed: z
    .union([z.literal("on"), z.undefined()])
    .optional()
    .transform((value) => value === "on"),
  whoShouldAttend: z
    .string()
    .optional()
    .transform((value) =>
      value ? value.split("\n").map((s) => s.trim()).filter(Boolean) : [],
    ),
  schedule: parseJsonArray("Schedule"),
  faqs: parseJsonArray("FAQs"),
  links: parseJsonArray("Links"),

  isFeatured: z
    .union([z.literal("on"), z.undefined()])
    .optional()
    .transform((value) => value === "on"),
});
