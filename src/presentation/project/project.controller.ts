import { Request, Response } from "express";
import { CreateProject, CreateProjectDto, CustomError, GetAllProjects, PaginationDto, ProjectRepository } from "../../domain";




export class ProjectController {
  constructor(
    private readonly projectRepository: ProjectRepository
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);

    return res.status(500).json({ error: 'Internal Server Error' })
  }


  createProject = (req: Request, res: Response) => {
    const [error, cerateProjectDto] = CreateProjectDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new CreateProject(this.projectRepository)
      .execute(cerateProjectDto!)
      .then(project => res.json(project))
      .catch(error => this.handleError(error, res));
  }


  getAllProjects = (req: Request, res: Response) => {
    const { page = 1, limit = 10  } = req.query
    const [error, paginationDto] = PaginationDto.create(+page, +limit)
    if (error) return res.status(400).json({ error })

    new GetAllProjects(this.projectRepository)
      .execute(paginationDto!)
      .then(projects => res.json(projects))
      .catch(error => this.handleError(error, res));
  }
}
