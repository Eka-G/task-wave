import Draggable from "react-draggable";
import style from "./style.module.scss";
import { BaseInfo } from "@/shared/types";

export default function TaskCard({ id, name }: BaseInfo) {
  return (
    <Draggable>
      <li className={style.task}>
        <p key={id} className={style.task__text}>
          {name}
        </p>
      </li>
    </Draggable>
  );
}
