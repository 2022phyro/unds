import { z } from "zod";

export const teamRegistrationSchema = z.object({
  institution: z.string().min(1, { error: "Institution is required." }),
  teamName: z.string().min(1, { error: "Team name is required." }),
  player1Name: z.string().min(1, { error: "Speaker 1 name is required." }),
  player1Email: z.email({ error: "Enter a valid email for Speaker 1." }),
  player2Name: z.string().min(1, { error: "Speaker 2 name is required." }),
  player2Email: z.email({ error: "Enter a valid email for Speaker 2." }),
});

export const adjudicatorRegistrationSchema = z.object({
  name: z.string().min(1, { error: "Name is required." }),
  email: z.email({ error: "Enter a valid email." }),
});

export const individualRegistrationSchema = z.object({
  name: z.string().min(1, { error: "Name is required." }),
  email: z.email({ error: "Enter a valid email." }),
});

export const psRegistrationSchema = z.object({
  name: z.string().min(1, { error: "Name is required." }),
  email: z.email({ error: "Enter a valid email." }),
  institution: z.string().min(1, { error: "Institution is required." }),
});

export const psAdjudicatorRegistrationSchema = z.object({
  name: z.string().min(1, { error: "Name is required." }),
  email: z.email({ error: "Enter a valid email." }),
});
