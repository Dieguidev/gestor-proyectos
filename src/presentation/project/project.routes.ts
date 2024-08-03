import { Router } from "express";
import { ProjectController } from "./project.controller";
import { ProjectDataSourceImpl, ProjectRepositoryImpl } from "../../infrastructure";
import { ProjectService } from "../services/project.service";



export class ProjectRoutes {

  static get routes(): Router {
    const router = Router();

    const projectService = new ProjectService()
    const controller = new ProjectController(projectService);

    router.post('/', controller.createProject)
    router.get('/', controller.getAllProjects)
    router.get('/:id', controller.getProjectById)

    router.put('/:id', controller.updateProject)
    router.delete('/:id', controller.deleteProject)

    return router;
  }
}
