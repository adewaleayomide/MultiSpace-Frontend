import { z } from "zod";

export const joinWorkspaceSchema = z.object({
  workspaceSlug: z
    .string()
    .trim()
    .nonempty("Workspace slug is required")
    .max(40, "Workspace slug is too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and can contain hyphens"),

  inviteCode: z
    .string()
    .trim()
    .max(20, "Invite code is too long")
    .optional()
    .or(z.literal("")),
});

export type JoinWorkspaceInput = z.infer<typeof joinWorkspaceSchema>;