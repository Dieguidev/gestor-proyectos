import { CreateProjectDto, PaginationDto, ProjectEntity, ProjectsEntitiesWithPagination } from "..";



export abstract class ProjectDataSource {
  abstract createProject(creaProjectDto: CreateProjectDto): Promise<ProjectEntity>;

  abstract getAllProjects(paginationDto: PaginationDto): Promise<ProjectsEntitiesWithPagination>;
}
