import { StudentModel } from "../models/studentDB";
import { Student } from "../models/student";

export class StudentRepository {

   async findByEmail(email: string) {
    return await StudentModel.findOne({ email });
  }
  // CREATE
  async add(student: Student): Promise<Student> {
    const created = await StudentModel.create(student);
    return created.toObject() as unknown as Student;
  }

  // LIST ALL
  async getAll(): Promise<Student[]> {
    return (await StudentModel.find().lean()) as unknown as Student[];
  }

  // UPDATE
  async update(
    id: string,
    data: Partial<Student>
  ): Promise<Student | null> {
    return (await StudentModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    ).lean()) as unknown as Student | null;
  }

  // DELETE 
  async delete(id: string): Promise<boolean> {
    const result = await StudentModel.findByIdAndDelete(id);
    return !!result;
  }

  // SEARCH
  async search(query: string): Promise<Student[]> {
    return (await StudentModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    }).lean()) as unknown as Student[];
  }
}
