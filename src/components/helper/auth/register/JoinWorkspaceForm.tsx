

import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "../../../ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinWorkspaceSchema, JoinWorkspaceInput } from "@/lib/validators/joinWorkspace.ts";
import { Button } from "../../../ui/button";


export default function JoinWorkspaceForm({ next, back, onComplete }: {
  next: () => void,
  back: () => void,
  onComplete: (data: JoinWorkspaceInput) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinWorkspaceInput>({
    resolver: zodResolver(joinWorkspaceSchema),
  });

  // Handle form submission
  const onSubmit = (data: JoinWorkspaceInput) => {
    onComplete(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* WORKSPACE NAME */}
      <Field>
        <FieldLabel>Workspace Slug</FieldLabel>
        <Input
          {...register("workspaceSlug")}
          placeholder="Workspace slug"
          className="placeholder:text-xs text-md"
        />
        <p className="text-xs text-red-500 mt-1">{errors.workspaceSlug?.message}</p>
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
          onClick={next}
        >
          Join Workspace
        </Button>
      </div>
    </form>
  );
}