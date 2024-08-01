import { ProjectRepository, UpdateProjectDto } from "../..";


interface ProjectUpdate {
  project: {
    id: string;
    projectName: string;
    clientName: string;
    description: string;
  }
}

interface UpdateProjectUseCase {
  execute(updateProjectDto: UpdateProjectDto): Promise<ProjectUpdate>
}

export class UpdateProject implements UpdateProjectUseCase {

  constructor(
    private readonly projectRepository: ProjectRepository,
  ) { }

  async execute(updateProjectDto: UpdateProjectDto): Promise<ProjectUpdate> {

    const project = await this.projectRepository.updateProject(updateProjectDto);

    return {
      project: {
        id: project.id,
        projectName: project.projectName,
        clientName: project.clientName,
        description: project.description,
      }
    }
  }
}
