import { Request, Response } from "express";
import { CreateTaskDto, CustomError, GetTaskByIdDto, GetTasksByProjectIdDto, UpdateTaskDto } from "../../domain";
import { TaskService } from "../services/task.service";

export class TaskController {

  constructor(
    private readonly taskService: TaskService
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(`${error}`);

    return res.status(500).json({ error: 'Internal Server Error' })
  }


  createTask = (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { name, description, project } = req.body
    const [error, createTaskDto] = CreateTaskDto.create({ name, description, projectId })
    if (error) return res.status(400).json({ error })

    this.taskService.createTask(createTaskDto!, project)
      .then((task) => res.json(task))
      .catch((error) => this.handleError(error, res));
  }

  getTasksByProjectId = (req: Request, res: Response) => {
    const { projectId } = req.params;
    const [error, getTasksByProjectIdDto] = GetTasksByProjectIdDto.create({ projectId })
    if (error) return res.status(400).json({ error })

    this.taskService.getTasksByProjectId(getTasksByProjectIdDto!)
      .then((tasks) => res.json(tasks))
      .catch((error) => this.handleError(error, res));
  }

  getTaskById = (req: Request, res: Response) => {
    const { id } = req.params;
    const { projectId } = req.params;

    const [error, getTaskByIdDto] = GetTaskByIdDto.create({ id, projectId })
    if (error) return res.status(400).json({ error })

    this.taskService.getTaskById(getTaskByIdDto!)
      .then((task) => res.json(task))
      .catch((error) => this.handleError(error, res));
  }

  updateTask = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const [error, updateTaskDto] = UpdateTaskDto.create( {id, name, description })
    if (error) return res.status(400).json({ error })

    this.taskService.updateTask(updateTaskDto!)
      .then((task) => res.json(task))
      .catch((error) => this.handleError(error, res));
  }

  deleteTask = (req: Request, res: Response) => {
    const { id } = req.params;
    const { projectId } = req.params;
    const { project } = req.body

    const [error, getTaskByIdDto] = GetTaskByIdDto.create({ id, projectId })
    if (error) return res.status(400).json({ error })

    this.taskService.deleteTask(getTaskByIdDto!, project)
      .then(() => res.json({ message: 'Task deleted' }))
      .catch((error) => this.handleError(error, res));
  }
}
