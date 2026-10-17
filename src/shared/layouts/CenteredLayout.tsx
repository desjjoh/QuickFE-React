import type { ComponentPropsWithoutRef } from "react";

import { StackedLayout } from "./StackedLayout";

import styles from "./CenteredLayout.module.scss";

type Props = ComponentPropsWithoutRef<"div"> & {
  surface?: boolean;
};

export function CenteredLayout({ surface = false, className, children, ...props }: Props) {
  return (
    <div
      {...props}
      className={[styles.centeredLayout, className].filter(Boolean).join(" ")}>
      <StackedLayout className={surface ? styles.surfaceLayout : undefined}>{children}</StackedLayout>
    </div>
  );
}
