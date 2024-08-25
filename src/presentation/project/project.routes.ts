import { Router } from "express";
import { ProjectService } from "../services/project.service";
import { ProjectController } from "./project.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class ProjectRoutes {

  static get routes(): Router {
    const router = Router();

    const projectService = new ProjectService()
    const controller = new ProjectController(projectService);

    router.use(AuthMiddleware.validateJWT)

    router.post('/', controller.createProject)
    router.get('/', controller.getAllProjects)
    router.get('/:id', controller.getProjectById)
    router.put('/:id', controller.updateProject)
    router.delete('/:id', controller.deleteProject)

    return router;
  }
}
