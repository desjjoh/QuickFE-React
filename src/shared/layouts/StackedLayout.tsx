import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./StackedLayout.module.scss";

type Props = ComponentPropsWithoutRef<"div"> & {
  footer?: ReactNode;
};

export function StackedLayout({
  footer,
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={[styles.stackedLayout, className].filter(Boolean).join(" ")}>
      <div className={styles.stackedContent}>{children}</div>

      {footer && <footer className={styles.stackedFooter}>{footer}</footer>}
    </div>
  );
}
