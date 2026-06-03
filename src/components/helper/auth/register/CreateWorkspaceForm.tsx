"use client";

import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "../../../ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWorkspaceSchema,
  CreateWorkspaceInput,
} from "@/lib/validators/auth/register/createWorkspace";
import { RegisterInput } from "@/lib/validators/auth/register/register";

import { useEffect, useState } from "react";
import { Button } from "../../../ui/button";
import { toast } from "sonner";
import { createWorkspace } from "@/services/auth.service";

export function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CreateWorkspaceForm({
  back,
  onNext,
}: {
  back: () => void;
  onNext: () => void;
}) {

  const [ workspaceData, setWorkspaceData] = useState<CreateWorkspaceInput | null>(null);

  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<CreateWorkspaceInput>({
    resolver: zodResolver(createWorkspaceSchema),
  });


  const handleFinalSubmit = async (data: CreateWorkspaceInput) => {
    const values = getValues();

    const payload = {
      workspaceName: values.workspaceName,
      slug: values.slug,
      description: values.description
    };
    try {
    const data = await createWorkspace(payload);

    console.log(payload);

    toast.success( data.message || "Account and Workspace created successfully!");

    setWorkspaceData(payload);

    }  catch (error) {
      toast.error (
        error instanceof Error
        ? error.message
        : "Creation failed. Please check your credentials and try again."
      )
    }
  };


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


  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)}  className="space-y-4">
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
        >
          Create Workspace
        </Button>
      </div>
    </form>
  );
}
