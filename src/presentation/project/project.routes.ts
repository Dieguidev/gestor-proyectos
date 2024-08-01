import { Router } from "express";
import { ProjectController } from "./project.controller";
import { ProjectDataSourceImpl, ProjectRepositoryImpl } from "../../infrastructure";



export class ProjectRoutes {

  static get routes(): Router {
    const router = Router();

    const database = new ProjectDataSourceImpl();
    const projectRepository = new ProjectRepositoryImpl(database);
    const controller = new ProjectController(projectRepository);

    router.post('/', controller.createProject)
    router.get('/', controller.getAllProjects)
    router.get('/:id', controller.getProjectById)

    router.put('/:id', controller.updateProject)
    router.delete('/:id', controller.deleteProject)

    return router;
  }
}
