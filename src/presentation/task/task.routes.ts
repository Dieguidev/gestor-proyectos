import { Router } from "express";
import { ValidateProjectMiddleware } from "../middlewares/validate-project-exists.middleware";
import { TaskService } from "../services/task.service";
import { TaskController } from "./task.controller";



export class TaskRoutes {
  static get routes(): Router {
    const router = Router();

    const taskService = new TaskService();
    const controller = new TaskController(taskService);

    router.post('/:projectId', ValidateProjectMiddleware.validateProjectExists, controller.createTask);
    router.get('/:projectId', ValidateProjectMiddleware.validateProjectExists, controller.getTasksByProjectId);
    router.get('/:projectId/task/:id',ValidateProjectMiddleware.validateProjectExists, controller.getTaskById);


    return router;
  }
}
