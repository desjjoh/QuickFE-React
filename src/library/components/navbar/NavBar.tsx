import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./NavBar.module.scss";

type Props = Omit<ComponentPropsWithoutRef<"nav">, "children"> & {
  centered?: boolean;
  start?: ReactNode;
  center?: ReactNode;
  end?: ReactNode;
};

export function NavBar({
  centered = false,
  start,
  center,
  end,
  className,
  ...props
}: Props): React.JSX.Element {
  return (
    <nav
      aria-label="Primary navigation"
      {...props}
      className={[styles["nav-bar"], centered && styles["is-centered"], className]
        .filter(Boolean)
        .join(" ")}>
      <div className={styles["nav-bar__start"]}>{start}</div>
      <div className={styles["nav-bar__center"]}>{center}</div>
      <div className={styles["nav-bar__end"]}>{end}</div>
    </nav>
  );
}
