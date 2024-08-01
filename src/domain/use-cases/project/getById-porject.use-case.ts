import { GetByIdProjectDto, ProjectRepository } from "../..";


interface Project {
  id: string;
  projectName: string;
  clientName: string;
  description: string;
}

interface GetByIdProjectUseCase {
  execute(getByIdProjectDto: GetByIdProjectDto): Promise<Project>
}

export class GetByIdProject implements GetByIdProjectUseCase {

  constructor(
    private readonly projectRepository: ProjectRepository,
  ) { }

  async execute(getByIdProjectDto: GetByIdProjectDto): Promise<Project> {
    const project = await this.projectRepository.getProjectById(getByIdProjectDto);

    return {
      id: project.id,
      projectName: project.projectName,
      clientName: project.clientName,
      description: project.description,
    }
  }
}
