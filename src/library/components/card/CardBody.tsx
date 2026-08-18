import type { ComponentPropsWithoutRef } from "react";

import { useCardContext } from "./CardContext";

import styles from "./CardBody.module.scss";

type Props = ComponentPropsWithoutRef<"div"> & {
  center?: boolean;
};

export function CardBody({
  center = false,
  className,
  children,
  ...props
}: Props) {
  useCardContext();

  return (
    <div
      {...props}
      className={[styles.cardBody, center && styles.center, className]
        .filter(Boolean)
        .join(" ")}>
      {children}
    </div>
  );
}
