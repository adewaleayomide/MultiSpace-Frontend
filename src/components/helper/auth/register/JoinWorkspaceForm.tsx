

import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "../../../ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinWorkspaceSchema, JoinWorkspaceInput } from "@/lib/validators/auth/register/joinWorkspace";
import { Button } from "../../../ui/button";

import { RegisterInput } from "@/lib/validators/auth/register/register";
import { toast } from "sonner";
import { joinWorkspace } from "@/services/auth.service";
import { useState } from "react";


export default function JoinWorkspaceForm({
  back,
  onNext,
}: {
  back: () => void;
  onNext: () => void;
}) {
  const [ workspaceData, setWorkspaceData] = useState<JoinWorkspaceInput | null>(null);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinWorkspaceInput>({
    resolver: zodResolver(joinWorkspaceSchema),
  });

  const handleFinalSubmit = async (data: JoinWorkspaceInput) => {
      const values = getValues();
  
      const payload = {
        slug: values.slug,
        inviteCode: values.inviteCode,
      };
    try {

      const data = await joinWorkspace(payload);
  
      console.log(payload);
  
      toast.success( data.message || "Account and Workspace created successfully!");
  
      setWorkspaceData(payload);

    } catch (error) {
        toast.error (
          error instanceof Error
          ? error.message
          : "Failed to join workspace. Please check your inputs and try again."
        )
      }
  };
  

  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-4">
      {/* WORKSPACE NAME */}
      <Field>
        <FieldLabel>Workspace Slug</FieldLabel>
        <Input
          {...register("slug")}
          placeholder="Workspace slug"
          className="placeholder:text-xs text-md"
        />
        <p className="text-xs text-red-500 mt-1">{errors.slug?.message}</p>
      </Field>

      {/* INVITE CODE */}
      <Field>
        <FieldLabel>Invite Code</FieldLabel>
        <Input
          {...register("inviteCode")}
          placeholder="Enter invite code"
          className="placeholder:text-xs text-md"
        />
        <p className="text-xs text-red-500 mt-1">{errors.inviteCode?.message}</p>
      </Field>


      {/* SUBMIT BUTTON */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={back}
          >
          Back
        </Button>
        <Button
          type="submit"
        >
          Join Workspace
        </Button>
      </div>
    </form>
  );
}