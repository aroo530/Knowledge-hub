import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

export class UserRepository implements IUserRepository {
  findByEmail(email: string): Promise<User | null> {
      throw new Error("Method not implemented.");
  }
  delete(user: User): Promise<User> {
      throw new Error("Method not implemented.");
  }
  update(user: User): Promise<User> {
      throw new Error("Method not implemented.");
  }
  list(user: User): Promise<User> {
      throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<User | null> {
    // Simulating DB query
    return new User(id, "John Doe", "john@example.com", "hashedpassword");
  }

  async create(user: User): Promise<User> {
    // Simulate DB insert
    return user;
  }
}
