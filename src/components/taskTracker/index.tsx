import { DndContext, DragEndEvent, pointerWithin } from "@dnd-kit/core";

import { useAppDispatch } from "@app/hooks";
import { DroppableArea, TaskCard } from "@components";
import { taskStatusChanged } from "@features/projects/projects-slice";
import { DND_ID_DEVIDER } from "@shared/conatants";
import { Task, TaskList, TaskStatus } from "@shared/types";

import style from "./style.module.scss";

type TaskTrackerProps = {
  projectId: string;
  taskList: TaskList;
};

export default function TaskTracker({ taskList, projectId }: TaskTrackerProps) {
  const dispatch = useAppDispatch();

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
            <TaskCard
              key={task.id}
              id={`${task.status}${DND_ID_DEVIDER}${task.id}`}
              name={task.name}
            />
          ))}
        </ul>
      </DroppableArea>
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const eventDNDId = String(event.active.id);

    if (
      event.over &&
      (event.over.id === "inLine" ||
        event.over.id === "inProgress" ||
        event.over.id === "done")
    ) {
      const [prevStatus, taskId] = eventDNDId.split(DND_ID_DEVIDER);

      if (prevStatus && prevStatus !== event.over.id) {
        dispatch(
          taskStatusChanged({
            projectId,
            taskId: taskId,
            prevStatus: prevStatus as TaskStatus,
            newStatus: event.over.id as TaskStatus,
          })
        );
      }

      return;
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
      <div className={style.tracker}>
        {renderList("inLine", "🌊", "Очередь", taskList.inLine)}
        {renderList("inProgress", "🛠", "В работе", taskList.inProgress)}
        {renderList("done", "🎉", "Сделано", taskList.done)}
      </div>
    </DndContext>
  );
}
