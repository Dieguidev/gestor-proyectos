import { Router } from "express";
import { NoteService } from "../services/note.service";
import { NoteController } from "./note.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class NoteRoutes {
  static get routes(): Router {
    const router = Router();
    const noteService = new NoteService();
    const controller = new NoteController(noteService);

    router.use(AuthMiddleware.validateJWT)

    router.post("/project/:projectId/task/:taskId", controller.createNote);

    return router;
  }
}
