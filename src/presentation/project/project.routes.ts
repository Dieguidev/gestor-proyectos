import { Router } from "express";
import { ProjectService } from "../services/project.service";
import { ProjectController } from "./project.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ValidateProjectMiddleware } from "../middlewares/validate-project-exists.middleware";




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


    //*router for team members
    router.post('/:projectId/team/find', [ValidateProjectMiddleware.validateProjectExists], controller.findMemberByEmail)
    router.post('/:projectId/team', [ValidateProjectMiddleware.validateProjectExists], controller.addMemberById)
    router.delete('/:projectId/team/:userId', [ValidateProjectMiddleware.validateProjectExists], controller.removeMemberById)
    router.get('/:projectId/team', [ValidateProjectMiddleware.validateProjectExists], controller.getMembers)

    return router;
  }
}
