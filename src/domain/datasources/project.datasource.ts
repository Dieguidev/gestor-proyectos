import { CreateProjectDto, PaginationDto, ProjectEntity, ProjectsEntitiesWithPagination } from "..";
import { GetByIdProjectDto } from '../dtos/project/getById-project.dto';



export abstract class ProjectDataSource {
  abstract createProject(creaProjectDto: CreateProjectDto): Promise<ProjectEntity>;

  abstract getAllProjects(paginationDto: PaginationDto): Promise<ProjectsEntitiesWithPagination>;

  abstract getProjectById(getByIdProjectDto: GetByIdProjectDto): Promise<ProjectEntity>;
}
