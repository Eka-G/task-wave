import { TaskCard } from "@components";
import { Task } from "@shared/types";

import style from "./style.module.scss";

type TaskTrackerProps = {
  taskList?: Task[];
};

export default function TaskTracker({ taskList }: TaskTrackerProps) {
  return (
    <div className={style.tracker}>
      <div className={style.tracker__status}>
        <h2 className={style.tracker__title}>
          <span className={style.tracker__icon}>&#127754;</span> Очередь
        </h2>
        <ul className={style.tracker__list}>
          {!!taskList?.length &&
            taskList.map((task) => {
              return <TaskCard id={task.id} name={task.name} />;
            })}
        </ul>
      </div>
      <div className={style.tracker__status}>
        <h2 className={style.tracker__title}>
          <span className={style.tracker__icon}>&#128736;</span> В работе
        </h2>
        <ul className={style.tracker__list}></ul>
      </div>
      <div className={style.tracker__status}>
        <h2 className={style.tracker__title}>
          <span className={style.tracker__icon}>&#127881;</span> Сделано
        </h2>
        <ul className={style.tracker__list}></ul>
      </div>
    </div>
  );
}
