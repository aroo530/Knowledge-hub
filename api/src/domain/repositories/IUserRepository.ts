import { User } from "../entities/User";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  delete(user: User): Promise<User>;
  update(user: User): Promise<User>;
  list(user: User): Promise<User>;
}
