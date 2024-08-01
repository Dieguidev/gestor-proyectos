import { Request, Response } from "express";
import { CustomError } from "../../domain";


export class ProjectController {

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);

    return res.status(500).json({ error: 'Internal Server Error' })
  }


  getAllProjects = (req: Request, res: Response) => {
    res.send('Get all projects')
  }
}
