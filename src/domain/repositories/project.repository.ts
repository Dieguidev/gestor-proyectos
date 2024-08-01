
import { GetByIdProjectDto, PaginationDto } from "..";
import { CreateProjectDto } from "../dtos/project/create-project.dto";
import { ProjectEntity, ProjectsEntitiesWithPagination } from "../entities/project.entity";


export abstract class ProjectRepository {
  abstract createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity>

  abstract getAllProjects(paginationDto: PaginationDto): Promise<ProjectsEntitiesWithPagination>

  abstract getProjectById(getByIdProjectDto: GetByIdProjectDto): Promise<ProjectEntity>
}
