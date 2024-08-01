
import { GetByIdProjectDto, PaginationDto, UpdateProjectDto } from "..";
import { CreateProjectDto } from "../dtos/project/create-project.dto";
import { DeleteProjectDto } from "../dtos/project/delete-project.dto";
import { ProjectEntity, ProjectsEntitiesWithPagination } from "../entities/project.entity";


export abstract class ProjectRepository {
  abstract createProject(createProjectDto: CreateProjectDto): Promise<ProjectEntity>

  abstract getAllProjects(paginationDto: PaginationDto): Promise<ProjectsEntitiesWithPagination>

  abstract getProjectById(getByIdProjectDto: GetByIdProjectDto): Promise<ProjectEntity>

  abstract updateProject(updateProjectDto : UpdateProjectDto): Promise<ProjectEntity>;

  abstract deleteProject(deleteProjectDto: DeleteProjectDto): Promise<ProjectEntity>;
}
