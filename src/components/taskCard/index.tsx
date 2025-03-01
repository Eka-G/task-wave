import { useDraggable } from "@dnd-kit/core";

import { BaseInfo } from "@shared/types";

import style from "./style.module.scss";

export default function TaskCard({ id, name }: BaseInfo) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const dragStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <li
      ref={setNodeRef}
      className={style.task}
      style={dragStyle}
      {...attributes}
      {...listeners}
    >
      <p className={style.task__text}>{name}</p>
    </li>
  );
}
