import { DeleteProjectDto, ProjectRepository } from "../..";

interface ProjectDelete {
  project: {
    id: string;
    projectName: string;
    clientName: string;
    description: string;
  }
}

interface DeleteProjectUseCase {
  execute(deleteProjectDto: DeleteProjectDto): Promise<ProjectDelete>
}

export class DeleteProject implements DeleteProjectUseCase {

  constructor(
    private readonly projectRepository: ProjectRepository,
  ) { }

  async execute(deleteProjectDto: DeleteProjectDto): Promise<ProjectDelete> {

    const project = await this.projectRepository.deleteProject(deleteProjectDto);

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
