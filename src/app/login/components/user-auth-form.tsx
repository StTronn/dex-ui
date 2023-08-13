"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLogin } from "@/api/useLogin"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }


export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const { mutate, isLoading, isError, error } = useLogin();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const email = (event.target as any)["email"].value;
    const password = (event.target as any)["password"].value;

    mutate({
      emailId: email,
      password: password,
    }, {
      onSuccess: () => {
        router.push("/trade")
      }
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password" // fixed the type from "email" to "password"
              autoCapitalize="none"
              autoComplete="current-password" // fixed the autoComplete attribute for password field
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>

          {/* Show error if there's any */}
          {isError && (
            <div className="mt-4 text-red-500">
              {error?.message || "An error occurred"}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
