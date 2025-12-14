import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

import { StudentRepository } from "./repositories/StudentRepository";
import { StudentService } from "./services/StudentService";
import { StudentController } from "./controllers/StudentController";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

const repo = new StudentRepository();
const service = new StudentService(repo);
const controller = new StudentController(service);

app.post("/students", (req, res) => controller.create(req, res));
app.get("/students", (req, res) => controller.list(req, res));
app.get("/students/search", (req, res) => controller.search(req, res));
app.put("/students/:id", (req, res) => controller.update(req, res));
app.delete("/students/:id", (req, res) => controller.delete(req, res));

export default app;
