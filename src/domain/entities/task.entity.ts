

export class TaskEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public project: string,
    public status: string,
  ) {}
}
