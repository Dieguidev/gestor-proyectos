import { Request, Response } from "express";
import { CreateProject, CreateProjectDto, CustomError, DeleteProject, DeleteProjectDto, GetAllProjects, GetByIdProject, GetByIdProjectDto, PaginationDto, ProjectRepository, UpdateProject, UpdateProjectDto } from "../../domain";




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
    const { page = 1, limit = 10 } = req.query
    const [error, paginationDto] = PaginationDto.create(+page, +limit)
    if (error) return res.status(400).json({ error })

    new GetAllProjects(this.projectRepository)
      .execute(paginationDto!)
      .then(projects => res.json(projects))
      .catch(error => this.handleError(error, res));
  }


  getProjectById = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, getByIdProjectDto] = GetByIdProjectDto.create({ id })
    if (error) return res.status(400).json({ error })

    new GetByIdProject(this.projectRepository)
      .execute(getByIdProjectDto!)
      .then(project => res.json(project))
      .catch(error => this.handleError(error, res));
  }

  updateProject = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateProjectDto] = UpdateProjectDto.create({id, ...req.body})
    if (error) return res.status(400).json({ error })

    new UpdateProject(this.projectRepository)
      .execute(updateProjectDto!)
      .then(project => res.json(project))
      .catch(error => this.handleError(error, res));
  }

  deleteProject = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, deleteProjectDto] = DeleteProjectDto.create({ id })
    if (error) return res.status(400).json({ error })

    new DeleteProject(this.projectRepository)
      .execute(deleteProjectDto!)
      .then(project => res.json(project))
      .catch(error => this.handleError(error, res));
  }
}
