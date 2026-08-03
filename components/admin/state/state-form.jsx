"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/api/errors";
import { stateFormSchema } from "@/schemas/state.schema";
import { createState, updateState } from "@/services/state.service";

// /**
//  * @param {{
//  *   mode: "create" | "edit",
//  *   stateId?: string,
//  *   defaultValues?: { name?: string },
//  * }} props
//  */
export function StateForm({ mode, stateId, defaultValues }) {
  const router = useRouter();
  // const [serverError, setServerError] = useState(null);

  const form = useForm({
    resolver: zodResolver(stateFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  // /**
  //  * @param {import("zod").infer<typeof stateFormSchema>} values
  //  */
  async function onSubmit(values) {
    // setServerError(null);

    try {
      if (mode === "create") {
        await createState(values);
        toast.success("State created successfully");
      } else {
        if (!stateId) {
          throw new Error("Missing state id");
        }

        await updateState(stateId, values);
        toast.success("State updated successfully");
      }

      router.push("/admin/state");
      router.refresh();
    } catch (error) {
      const message = getErrorMessage(
        error,
        mode === "create" ? "Failed to create state" : "Failed to update state",
      );
      // setServerError(message);
      toast.error(message);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-3 gap-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="state-name">Name</FieldLabel>
              <Input
                {...field}
                id="state-name"
                placeholder="Enter state name"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
                autoComplete="off"
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
        {/* {serverError ? (
          <p className="text-sm text-destructive" role="alert">
            Server error: {serverError}
          </p>
        ) : null} */}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-3">
        <div className="col-span-12 md:col-span-6 gap-2 flex justify-end items-center">
          <Button
            type="button"
            variant="outline"
            nativeButton={false}
            disabled={isSubmitting}
            render={<Link href="/admin/state" />}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? mode === "create"
                ? "Creating..."
                : "Saving..."
              : mode === "create"
                ? "Create state"
                : "Save changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
