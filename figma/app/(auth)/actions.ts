"use server";

import { signIn, signOut as serverSignOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { signInSchema, signUpSchema } from "@/lib/schemas";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ZodError } from "zod";

export async function signOut() {
  await serverSignOut({redirectTo: "/"});
}

export async function signUpAction(prevState: any, formData: FormData) {
  try {
    const { email, password } = await signUpSchema.parseAsync({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (user) return ["User already exists"];

    const hash = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        email,
        password: hash,
      },
    });

    await signIn("credentials", formData);
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof ZodError)
      return error.issues.map((error) => error.message);
    else if (error instanceof Error)
      return [`Error (${error.name}): ${error.message}`];

    return ["Oops something went wrong. Please try again later."];
  }
}

export async function signInAction(prevState: any, formData: FormData) {
  try {
    await signInSchema.parseAsync({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", formData);
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof ZodError)
      return error.issues.map((error) => error.message);
    else if (error instanceof AuthError && error.type === "CredentialsSignin")
      return ["Invalid credentials"];
    else if (error instanceof Error)
      return [`Error (${error.name}): ${error.message}`];

    return ["Oops something went wrong. Please try again later."];
  }
}
