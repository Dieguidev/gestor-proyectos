import { Router } from "express";
import { TaskController } from "./task.controller";
import { TaskDataSourceImpl, TaskRepositoryImpl } from "../../infrastructure";
import { ValidateProjectMiddleware } from "../middlewares/validate-project-exists.middleware";



export class TaskRoutes {
  static get routes(): Router {
    const router = Router();

    const data = new TaskDataSourceImpl();
    const taskRepository = new TaskRepositoryImpl(data);
    const controller = new TaskController(taskRepository);

    router.post('/:projectId', controller.createTask);
    router.get('/:projectId', );

    return router;
  }
}
