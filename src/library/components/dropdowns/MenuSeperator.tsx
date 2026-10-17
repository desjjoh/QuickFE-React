import type { ComponentPropsWithoutRef } from "react";
import styles from "./Dropdown.module.scss";

export function MenuSeperator({ className, ...props }: ComponentPropsWithoutRef<"hr">): React.JSX.Element {
  return <hr {...props} className={[styles.menu__separator, className].filter(Boolean).join(" ")} />;
}
