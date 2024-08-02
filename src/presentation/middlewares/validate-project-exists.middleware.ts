import { NextFunction, Request, Response } from "express";
import { ProjectRepositoryImpl } from "../../infrastructure";
import { ProjectModel } from "../../data/mongodb";

export class ValidateProjectMiddleware {

  static async validateProjectExists(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;

    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    req.body.project = project;
    next();
  }
}
