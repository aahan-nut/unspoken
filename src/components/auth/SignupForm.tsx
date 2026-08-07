"use client";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, Input } from "@/components/ui/FormField";
import { signup, type SignupActionState } from "@/lib/supabase/actions";
import Link from "next/link";
import { useActionState } from "react";

const initialState: SignupActionState = { error: null, success: false };

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  if (state.success) {
    return (
      <Alert variant="success" title="Check your email">
        We sent a confirmation link to finish creating your account. Once
        confirmed, come back and log in.
      </Alert>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <FieldWrapper label="Email" htmlFor="email" required>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
      </FieldWrapper>

      <FieldWrapper
        label="Password"
        htmlFor="password"
        required
        hint="At least 6 characters."
      >
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          placeholder="••••••••"
        />
      </FieldWrapper>

      {state.error && (
        <Alert variant="error" title="Couldn't create your account">
          {state.error}
        </Alert>
      )}

      <Button type="submit" className="w-full justify-center" loading={isPending}>
        Sign up
      </Button>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:text-primary-hover">
          Log in
        </Link>
      </p>
    </form>
  );
}
