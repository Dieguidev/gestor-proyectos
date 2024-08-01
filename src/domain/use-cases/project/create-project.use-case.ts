import { CreateProjectDto } from '../../dtos/project/create-project.dto';
import { ProjectRepository } from '../../repositories/project.repository';


interface Project {
  id: string;
  projectName: string;
  clientName: string;
  description: string;
}


interface CreateProjectUseCase {
  execute(createProjectDto: CreateProjectDto): Promise<Project>
}

export class CreateProject implements CreateProjectUseCase {

  constructor(
    private readonly projectRepository: ProjectRepository,
  ) { }

  async execute(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = await this.projectRepository.createProject(createProjectDto);

    return {
      id: project.id,
      projectName: project.projectName,
      clientName: project.clientName,
      description: project.description,
    }
  }
}
