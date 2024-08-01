import { PaginationDto, ProjectEntity, ProjectRepository, ProjectsEntitiesWithPagination } from "../..";

interface ProjectList {
  projects: ProjectEntity[]
}

interface GetAllProjectsUseCase {
  execute(paginationDto: PaginationDto): Promise<ProjectsEntitiesWithPagination>
}

export class GetAllProjects implements GetAllProjectsUseCase {
  constructor(
    private readonly projectRepository: ProjectRepository,
  ) { }

  async execute(paginationDto: PaginationDto): Promise<ProjectsEntitiesWithPagination> {
    const projects = await this.projectRepository.getAllProjects(paginationDto);

    return {
      page: projects.page,
      limit: projects.limit,
      total: projects.total,
      next: projects.next,
      prev: projects.prev,
      projects: projects.projects

  };
}


}
