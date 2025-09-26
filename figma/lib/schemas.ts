import z from "zod";

export const signUpSchema = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === undefined ? "Email is required" : "Invalid email",
  }),
  password: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "Password is required" : "Invalid password",
    })
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
});

export const signInSchema = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === undefined ? "Email is required" : "Invalid email",
  }),
  password: z.string({
    error: (iss) =>
      iss.input === undefined ? "Password is required" : "Invalid password",
  }),
});
