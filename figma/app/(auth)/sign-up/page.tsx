"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUpAction } from "../actions";
import { Loader2 } from "lucide-react";

export default function SignUpRoute() {
  const [error, signUp, isPending] = useActionState(signUpAction, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          Sign up
        </h1>

        <form className="space-y-4" action={signUp}>
          <input type="hidden" name="redirectTo" value="/dashboard" />

          <div className="relative h-fit">
            <label className="absolute left-3 top-2 text-[12px]">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-md border border-gray-300 text-sm px-3 pb-1.5 pt-7 focus:border-black focus:outline-none"
            />
          </div>

          <div className="relative h-fit">
            <label className="absolute left-3 top-2 text-[12px]">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              className="w-full rounded-md border border-gray-300 text-sm px-3 pb-1.5 pt-7 focus:border-black focus:outline-none"
            />
          </div>

          {error && (
            <ul className="text-sm text-red-500 border rounded-md py-2 px-3 border-red-500 bg-red-50">
              {error.map((e, index) => (
                <li key={index}>{e}</li>
              ))}
            </ul>
          )}

          <button
            disabled={isPending}
            className="w-full rounded-md bg-black text-white font-medium text-sm px-2 py-3 hover:bg-gray-900 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isPending ? (
              <Loader2 className="size-5 animate-spin mx-auto" />
            ) : (
              "Register"
            )}
          </button>

          <Link
            href="/sign-in"
            className="block text-center text-xs text-gray-600 hover:underline focus:underline focus:outline-none"
          >
            Have an account already? Sign in
          </Link>
        </form>
      </div>
    </main>
  );
}
