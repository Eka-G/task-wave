export type TaskStatus = "inLine" | "inProgress" | "done";
export type TaskList = { [key in TaskStatus]: Task[] | [] };

export type BaseInfo = {
  id: string;
  name: string;
};

export type Task = BaseInfo & {
  creationDate: Date;
  status: TaskStatus;
};

export type Project = BaseInfo & {
  taskList: TaskList;
};

export type AddNewFormValue = {
  name: string;
};
