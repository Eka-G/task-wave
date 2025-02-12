import style from "./style.module.scss";

export default function TaskTracker() {
  return (
    <div className={style.tracker}>
      <div className={style.tracker__list}>
        <h2 className={style.tracker__title}>
          <span className={style.tracker__icon}>&#127754;</span> Очередь
        </h2>
      </div>
      <div className={style.tracker__list}>
        <h2 className={style.tracker__title}>
          <span className={style.tracker__icon}>&#128736;</span> В работе
        </h2>
      </div>
      <div className={style.tracker__list}>
        <h2 className={style.tracker__title}>
          <span className={style.tracker__icon}>&#127881;</span> Сделано
        </h2>
      </div>
    </div>
  );
}
