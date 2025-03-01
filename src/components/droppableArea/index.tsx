import { ReactNode } from "react";
import classNames from "classnames";
import { useDroppable } from "@dnd-kit/core";

import style from "./style.module.scss";

type DroppableAreaProps = {
  children: ReactNode;
  className: string;
  id: string;
};

export default function DroppableArea({
  children,
  className,
  id,
}: DroppableAreaProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={classNames(className, { [style.dropArea]: isOver })}
    >
      {children}
    </div>
  );
}
