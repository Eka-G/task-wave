export type TaskStatus = "inLine" | "inProgress" | "done";

export type BaseInfo = {
  id: string;
  name: string;
};

export type Task = BaseInfo & {
  creationDate: Date;
  status: TaskStatus;
};

export type Project = BaseInfo & {
  taskList?: Task[];
};

export type AddNewFormValue = {
  name: string;
};
