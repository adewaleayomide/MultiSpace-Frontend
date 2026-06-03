import { z } from "zod";

export const joinWorkspaceSchema = z.object({
  slug: z
    .string()
    .trim()
    .nonempty("Workspace slug is required")
    .max(40, "Workspace slug is too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and can contain hyphens"),

  inviteCode: z
    .string()
    .trim()
    .min(1, "Invite code is required")
    .max(20, "Invite code is too long"),
    // .or(z.literal("")),
});

export type JoinWorkspaceInput = z.infer<typeof joinWorkspaceSchema>;