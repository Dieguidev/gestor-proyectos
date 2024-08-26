import { Router } from "express";
import { ValidateProjectMiddleware } from "../middlewares/validate-project-exists.middleware";
import { TaskService } from "../services/task.service";
import { TaskController } from "./task.controller";
import { ValidateTaskMiddleware } from "../middlewares/validate-task.middleware";



export class TaskRoutes {
  static get routes(): Router {
    const router = Router();

    const taskService = new TaskService();
    const controller = new TaskController(taskService);

    router.param('projectId', ValidateProjectMiddleware.validateProjectExists);

    router.post('/:projectId', controller.createTask);
    router.get('/:projectId', controller.getTasksByProjectId);

    router.param('taskId', ValidateTaskMiddleware.validateTaskExists);
    router.param('taskId', ValidateTaskMiddleware.taskBelongsToProject);

    router.get('/:projectId/task/:taskId', controller.getTaskById);
    router.put('/:projectId/task/:taskId', controller.updateTask);
    router.delete('/:projectId/task/:taskId', controller.deleteTask);
    router.post('/:projectId/task/:taskId/status', controller.updateTaskStatus);


    return router;
  }
}
