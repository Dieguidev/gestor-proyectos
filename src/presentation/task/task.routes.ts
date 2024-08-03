import { Router } from "express";
import { TaskController } from "./task.controller";
import { TaskDataSourceImpl, TaskRepositoryImpl } from "../../infrastructure";
import { ValidateProjectMiddleware } from "../middlewares/validate-project-exists.middleware";
import { TaskService } from "../services/task.service";



export class TaskRoutes {
  static get routes(): Router {
    const router = Router();

    const taskService = new TaskService();
    const controller = new TaskController(taskService);

    router.post('/:projectId', controller.createTask);
    router.get('/:projectId', controller.getTasksByProjectId);

    return router;
  }
}
