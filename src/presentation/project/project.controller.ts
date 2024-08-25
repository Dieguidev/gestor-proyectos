import { Request, Response } from "express";
import { CreateProjectDto, CustomError, DeleteProjectDto, GetByIdProjectDto, PaginationDto, UpdateProjectDto } from "../../domain";
import { ProjectService } from "../services/project.service";




export class ProjectController {
  constructor(
    private readonly projectService: ProjectService
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);

    return res.status(500).json({ error: 'Internal Server Error' })
  }


  createProject = (req: Request, res: Response) => {
    const [error, cerateProjectDto] = CreateProjectDto.create({...req.body, manager: req.user!.id})
    if (error) return res.status(400).json({ error })

    this.projectService.createProject(cerateProjectDto!)
      .then(project => res.json(project))
      .catch(error => this.handleError(error, res));
  }


  getAllProjects = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query
    const [error, paginationDto] = PaginationDto.create(+page, +limit)
    if (error) return res.status(400).json({ error })

    this.projectService.getAllProjects(paginationDto!, req.user!.id)
      .then(projects => res.json(projects))
      .catch(error => this.handleError(error, res));
  }


  getProjectById = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, getByIdProjectDto] = GetByIdProjectDto.create({ id })
    if (error) return res.status(400).json({ error })

    this.projectService.getProjectById(getByIdProjectDto!, req.user!.id)
      .then(project => res.json(project))
      .catch(error => this.handleError(error, res));
  }

  updateProject = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateProjectDto] = UpdateProjectDto.create({id, ...req.body})
    if (error) return res.status(400).json({ error })

    this.projectService.updateProject(updateProjectDto!)
      .then(project => res.json(project))
      .catch(error => this.handleError(error, res));
  }

  deleteProject = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, deleteProjectDto] = DeleteProjectDto.create({ id })
    if (error) return res.status(400).json({ error })

    this.projectService.deleteProject(deleteProjectDto!)
      .then(rpta => res.json(rpta))
      .catch(error => this.handleError(error, res));
  }
}
