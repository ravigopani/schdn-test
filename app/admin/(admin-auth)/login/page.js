"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/lib/api/errors";
import { setAdminToken } from "@/lib/auth-cookies";
import { adminLoginSchema } from "@/schemas/auth.schema";
import { loginAdmin } from "@/services/auth.service";

function LoginFormFallback() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin login</CardTitle>
        <CardDescription>Loading sign-in form…</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values) {
    try {
      const { token } = await loginAdmin(values);
      setAdminToken(token);
      toast.success("Signed in successfully");

      const next = searchParams.get("next");
      const redirectTo =
        next && next.startsWith("/admin") && !next.startsWith("/admin/login")
          ? next
          : "/admin";

      router.replace(redirectTo);
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to sign in"));
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin login</CardTitle>
        <CardDescription>Sign in to access the admin panel.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="admin-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="admin-email"
                  type="email"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="admin-password">Password</FieldLabel>
                <Input
                  {...field}
                  id="admin-password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginFormFallback />}>
      <AdminLoginForm />
    </Suspense>
  );
}
