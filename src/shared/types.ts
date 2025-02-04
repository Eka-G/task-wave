type TaskStatus = "created" | "inProgress" | "closed";

export type Task = {
  id: number;
  sequenceNumber: number;
  name: string;
  creationDate: Date;
  deadlineDate: Date;
  status: TaskStatus;
};

export type Project = {
  id: number;
  name: string;
  taskList: Task[];
};
