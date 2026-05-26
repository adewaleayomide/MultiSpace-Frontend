"use client";

import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "../../../ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWorkspaceSchema,
  CreateWorkspaceInput,
} from "@/lib/validators/createWorkspace";
import { useEffect, useState } from "react";
import { Button } from "../../../ui/button";

export function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CreateWorkspaceForm({ next, back, onComplete }: {
  next: () => void;
  back: () => void;
  onComplete: (data: CreateWorkspaceInput) => void;
}) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<CreateWorkspaceInput>({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const workspaceName = watch("workspaceName");
  const slug = watch("slug");
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  // AUTO GENERATE SLUG
  useEffect(() => {
    if (!isSlugEdited) {
      const generated = generateSlug(workspaceName || "");
      setValue("slug", generated, { shouldValidate: true });
    }
  }, [workspaceName, isSlugEdited, setValue]);

  // Handle form submission
  const onSubmit = (data: CreateWorkspaceInput) => {
    onComplete(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* WORKSPACE NAME */}
      <Field>
        <FieldLabel>Workspace Name</FieldLabel>
        <Input
          {...register("workspaceName")}
          placeholder="My Workspace"
          className="placeholder:text-xs text-md"
        />
        <p className="text-xs text-red-500 mt-1">
          {errors.workspaceName?.message}
        </p>
      </Field>

      {/* SLUG */}
      <Field>
        <FieldLabel>Workspace Slug</FieldLabel>
        <Input
          {...register("slug")}
          value={slug || ""}
          onChange={(e) => {
            setIsSlugEdited(true);
            setValue("slug", e.target.value, {
              shouldValidate: true,
            });
          }}
          placeholder="my-workspace"
          className="placeholder:text-xs text-md"
        />
        <p className="text-xs text-red-500 mt-1">
          {touchedFields.slug && errors.slug?.message}
        </p>
      </Field>

      {/* DESCRIPTION */}
      <Field>
        <FieldLabel>Description (Optional)</FieldLabel>
        <Input
          {...register("description")}
          placeholder="A brief description of your workspace"
          className="placeholder:text-xs text-md"
        />
        <p className="text-xs text-red-500 mt-1">
          {errors.description?.message}
        </p>
      </Field>

      {/* BUTTON */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={back}
          type="button"
        >
          Back
        </Button>
        <Button
          type="submit"
          onClick={next}
        >
          Create Workspace
        </Button>
      </div>
    </form>
  );
}
