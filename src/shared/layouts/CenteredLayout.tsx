import type { ComponentPropsWithoutRef } from "react";

import { StackedLayout } from "./StackedLayout";

import styles from "./CenteredLayout.module.scss";

type Props = ComponentPropsWithoutRef<"div">;

export function CenteredLayout({ className, children, ...props }: Props) {
  return (
    <div
      {...props}
      className={[styles.centeredLayout, className].filter(Boolean).join(" ")}>
      <StackedLayout>{children}</StackedLayout>
    </div>
  );
}
