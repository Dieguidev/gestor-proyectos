import { Router } from "express";
import { ValidateProjectMiddleware } from "../middlewares/validate-project-exists.middleware";
import { TaskService } from "../services/task.service";
import { TaskController } from "./task.controller";



export class TaskRoutes {
  static get routes(): Router {
    const router = Router();

    const taskService = new TaskService();
    const controller = new TaskController(taskService);

    router.param('projectId', ValidateProjectMiddleware.validateProjectExists);

    router.post('/:projectId', controller.createTask);
    router.get('/:projectId', controller.getTasksByProjectId);
    router.get('/:projectId/task/:id', controller.getTaskById);
    router.put('/:projectId/task/:id', controller.updateTask);
    router.delete('/:projectId/task/:id', controller.deleteTask);


    return router;
  }
}
