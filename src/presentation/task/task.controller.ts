import { Request, Response } from "express";
import { CreateTask, CreateTaskDto, CustomError, GetByIdProject, TaskRepository } from "../../domain";

export class TaskController {

  constructor(
    private readonly taskRepository: TaskRepository,
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
    const {name, description}= req.body
    const [error, createTaskDto] = CreateTaskDto.create( {name, description, projectId})
    if (error) return res.status(400).json({ error })

    new CreateTask(this.taskRepository)
      .execute(createTaskDto!)
      .then(task => res.json(task))
      .catch(error => this.handleError(error, res));
  }
}
