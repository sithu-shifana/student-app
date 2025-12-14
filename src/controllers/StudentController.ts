import { Request, Response } from "express";
import { StudentService } from "../services/StudentService";

export class StudentController {
  constructor(private service: StudentService) {}

  // CREATE
  async create(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const s = await this.service.create(name, email);
      res.status(201).json(s);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  // LIST
  async list(req: Request, res: Response) {
    try {
      const students = await this.service.list();
      res.json(students);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  }

  // SEARCH
  async search(req: Request, res: Response) {
    try {
      const q = String(req.query.q || "");
      const students = await this.service.search(q);
      res.json(students);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  // UPDATE
  async update(req: Request, res: Response) {
    try {
      const s = await this.service.update(req.params.id, req.body);
      res.json(s);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  // DELETE
 async delete(req: Request, res: Response) {
  try {
    await this.service.delete(req.params.id);
    res.status(200).json({
      message: "Student deleted successfully"
    });
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
}

}
