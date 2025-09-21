import type { User, InsertUser } from "../shared/schema";

export interface IStorage {
  // User operations
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}

class MemStorage implements IStorage {
  private users: User[] = [];

  async getUsers(): Promise<User[]> {
    return [...this.users];
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substring(2) + Date.now().toString(36),
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    return this.users[userIndex];
  }

  async deleteUser(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }
}

export const storage = new MemStorage();