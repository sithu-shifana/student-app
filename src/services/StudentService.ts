import { StudentRepository } from "../repositories/StudentRepository";
import { Student } from "../models/student";

export class StudentService {
  constructor(private repo: StudentRepository) {}

  async validate(name: string, email: string) {
    if (!name || name.trim().length < 2)
      throw new Error("Name must be at least 2 characters");

    if (!email || !email.includes("@") || !email.includes("."))
      throw new Error("Invalid email format");

     const exists = await this.repo.findByEmail(email);
     if (exists) {
      throw new Error("This email is already registered");
     }
  }

  // CREATE
  async create(name: string, email: string) {
    await this.validate(name, email);

    return await this.repo.add({
      name: name.trim(),
      email: email.trim()
    } as Student);
  }

  // LIST
  async list() {
    return await this.repo.getAll();
  }

  // SEARCH
  async search(query: string) {
    return await this.repo.search(query);
  }

  // UPDATE
async update(id: string, data: { name?: string; email?: string }) {
  if (data.name || data.email) {
    await this.validate(data.name ?? "", data.email ?? "");
  }

  const updated = await this.repo.update(id, data);
  if (!updated) throw new Error("Student not found");

  return updated;
}


  // DELETE
  async delete(id: string) {
    const ok = await this.repo.delete(id);
    if (!ok) throw new Error("Student not found");

    return true;
  }
}
