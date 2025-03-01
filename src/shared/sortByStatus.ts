import { useMemo } from "react";
import { Task, TaskStatus } from "@shared/types";

export default function sortByStatus(taskList?: Task[]) {
  const sortedTaskList: { [key in TaskStatus]: Task[] } = useMemo(() => {
    const inLine: Task[] = [],
      inProgress: Task[] = [],
      done: Task[] = [];

    taskList?.forEach((task) => {
      switch (task.status) {
        case "inProgress":
          inProgress.push(task);
          break;
        case "done":
          done.push(task);
          break;
        default:
          inLine.push(task);
      }
    });

    return { inLine, inProgress, done };
  }, [taskList]);

  return sortedTaskList;
}
