import type { ComponentPropsWithoutRef } from "react";

import { useCardContext } from "./CardContext";

import styles from "./CardBody.module.scss";

type Props = ComponentPropsWithoutRef<"div">;

export function CardBody({ className, children, ...props }: Props) {
  useCardContext();

  return (
    <div
      {...props}
      className={[styles.cardBody, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
