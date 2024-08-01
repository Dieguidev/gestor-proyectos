import { Router } from "express";
import { TaskController } from "./task.controller";



export class TaskRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new TaskController();

    router.post('/:projectId', );

    return router;
  }
}
