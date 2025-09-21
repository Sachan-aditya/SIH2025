import { z } from "zod";

// Define the basic app data model
// Since this appears to be a basic app, we'll start with a simple example
// and it can be extended based on actual requirements

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
});

// Create insert schema (for creating new users)
export const insertUserSchema = userSchema.omit({ id: true });

// Define types
export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;