import { ProjectEntity, ProjectRepository } from "../..";

interface ProjectList {
  projects: ProjectEntity[]
}

interface CreateProjectUseCase {
  execute(): Promise<ProjectList>
}

export class GetAllProjects implements CreateProjectUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
  ) { }

  async execute(): Promise<ProjectList> {
    const projects = await this.projectRepository.getAllProjects();

    return { projects };
  }


}
