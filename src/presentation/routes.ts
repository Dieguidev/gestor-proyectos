import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { ProjectRoutes } from "./project/project.routes";



export class AppRoutes {


  static get routes():Router {
    const router = Router();
    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/project', ProjectRoutes.routes)
    return router;
  }
}
