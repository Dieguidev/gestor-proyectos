import { Router } from "express";
import { ProjectController } from "./project.controller";


export class ProjectRoutes {

  static get routes(): Router {
    const router = Router();

    const controller = new ProjectController();

    router.post('/')
    router.get('/', controller.getAllProjects)

    return router;
  }
}
