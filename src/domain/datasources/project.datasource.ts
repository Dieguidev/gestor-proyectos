import { CreateProjectDto, PaginationDto, ProjectEntity, ProjectsEntitiesWithPagination, UpdateProjectDto } from "..";
import { DeleteProjectDto } from "../dtos/project/delete-project.dto";
import { GetByIdProjectDto } from '../dtos/project/getById-project.dto';



export abstract class ProjectDataSource {
  abstract createProject(creaProjectDto: CreateProjectDto): Promise<ProjectEntity>;

  abstract getAllProjects(paginationDto: PaginationDto): Promise<ProjectsEntitiesWithPagination>;

  abstract getProjectById(getByIdProjectDto: GetByIdProjectDto): Promise<ProjectEntity>;

  abstract updateProject(updateProjectDto : UpdateProjectDto): Promise<ProjectEntity>;

  abstract deleteProject(deleteProjectDto: DeleteProjectDto): Promise<ProjectEntity>;
}
