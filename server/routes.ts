import { Hono } from "hono";
import { storage } from "./storage";
import { insertUserSchema, userSchema } from "../shared/schema";
import { z } from "zod";

const app = new Hono();

// Get all users
app.get("/api/users", async (c) => {
  try {
    const users = await storage.getUsers();
    return c.json(users);
  } catch (error) {
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

// Get user by ID
app.get("/api/users/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = await storage.getUserById(id);
    
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    
    return c.json(user);
  } catch (error) {
    return c.json({ error: "Failed to fetch user" }, 500);
  }
});

// Create user
app.post("/api/users", async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = insertUserSchema.parse(body);
    
    const user = await storage.createUser(validatedData);
    return c.json(user, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Invalid data", details: error.errors }, 400);
    }
    return c.json({ error: "Failed to create user" }, 500);
  }
});

// Update user
app.patch("/api/users/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const validatedData = insertUserSchema.partial().parse(body);
    
    const user = await storage.updateUser(id, validatedData);
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }
    
    return c.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: "Invalid data", details: error.errors }, 400);
    }
    return c.json({ error: "Failed to update user" }, 500);
  }
});

// Delete user
app.delete("/api/users/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const success = await storage.deleteUser(id);
    
    if (!success) {
      return c.json({ error: "User not found" }, 404);
    }
    
    return c.json({ message: "User deleted successfully" });
  } catch (error) {
    return c.json({ error: "Failed to delete user" }, 500);
  }
});

export default app;