import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";

import { useAppDispatch } from "@app/hooks";
import { DroppableArea, TaskCard } from "@components";
import { taskStatusChanged } from "@features/projects/projects-slice";
import { Task, TaskStatus } from "@shared/types";
import sortByStatus from "@shared/sortByStatus";

import style from "./style.module.scss";

type TaskTrackerProps = {
  projectId: string;
  taskList?: Task[];
};

export default function TaskTracker({ taskList, projectId }: TaskTrackerProps) {
  const dispatch = useAppDispatch();

  const sortedTaskList = sortByStatus(taskList);

  const renderList = (
    status: TaskStatus,
    icon: string,
    title: string,
    tasks: Task[]
  ) => {
    return (
      <DroppableArea id={status} className={style.tracker__status}>
        <h2 className={style.tracker__title}>
          <span className={style.tracker__icon}>{icon}</span> {title}
        </h2>
        <ul className={style.tracker__list}>
          {tasks.map((task) => (
            <TaskCard key={task.id} id={task.id} name={task.name} />
          ))}
        </ul>
      </DroppableArea>
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const eventTaskId = String(event.active.id);

    if (
      event.over &&
      (event.over.id === "inLine" ||
        event.over.id === "inProgress" ||
        event.over.id === "done")
    ) {
      const prevStatus = sortedTaskList[event.over.id].find(
        (task) => task.id === eventTaskId
      )?.status;

      if (prevStatus !== event.over.id) {
        dispatch(
          taskStatusChanged({
            projectId,
            taskId: eventTaskId,
            status: String(event.over.id) as TaskStatus,
          })
        );
      }

      return;
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
      <div className={style.tracker}>
        {renderList("inLine", "🌊", "Очередь", sortedTaskList.inLine)}
        {renderList("inProgress", "🛠", "В работе", sortedTaskList.inProgress)}
        {renderList("done", "🎉", "Сделано", sortedTaskList.done)}
      </div>
    </DndContext>
  );
}
