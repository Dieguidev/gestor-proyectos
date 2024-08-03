import { Request, Response } from "express";
import { CreateTaskDto, CustomError, GetTasksByProjectIdDto } from "../../domain";
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
    const { name, description } = req.body
    const [error, createTaskDto] = CreateTaskDto.create({ name, description, projectId })
    if (error) return res.status(400).json({ error })

    this.taskService.createTask(createTaskDto!)
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
}
