import { z } from "zod";

export const createWorkspaceSchema = z.object({
  workspaceName: z
    .string()
    .trim()
    .min(3, "Workspace name is too short")
    .max(40, "Workspace name is too long"),

  slug: z
    .string()
    .trim()
    .max(40, "Workspace slug is too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and can contain hyphens")
    .optional(),

  description: z
    .string()
    .trim()
    .max(200, "Description is too long")
    .optional()
    .or(z.literal("")),
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;