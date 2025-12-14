import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

import { StudentRepository } from "./repositories/StudentRepository";
import { StudentService } from "./services/StudentService";
import { StudentController } from "./controllers/StudentController";

const app = express();
app.use(cors());
app.use(bodyParser.json());//read json from request body

// serve UI
app.use(express.static(path.join(__dirname, "public")));

const repo = new StudentRepository();//talk to db
const service = new StudentService(repo);//validation
const controller = new StudentController(service);//recieve and send http request

app.post("/students", (req, res) => controller.create(req, res));
app.get("/students", (req, res) => controller.list(req, res));
app.get("/students/search", (req, res) => controller.search(req, res));
app.put("/students/:id", (req, res) => controller.update(req, res));
app.delete("/students/:id", (req, res) => controller.delete(req, res));

export default app;
