"use client";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, Input } from "@/components/ui/FormField";
import { login, type AuthActionState } from "@/lib/supabase/actions";
import Link from "next/link";
import { useActionState } from "react";

const initialState: AuthActionState = { error: null };

interface LoginFormProps {
  redirectedFrom?: string;
}

export function LoginForm({ redirectedFrom }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectedFrom ?? "/resources"} />

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

      <FieldWrapper label="Password" htmlFor="password" required>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
      </FieldWrapper>

      {state.error && (
        <Alert variant="error" title="Couldn't log you in">
          {state.error}
        </Alert>
      )}

      <Button type="submit" className="w-full justify-center" loading={isPending}>
        Log in
      </Button>

      <p className="text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-primary hover:text-primary-hover">
          Sign up
        </Link>
      </p>
    </form>
  );
}
