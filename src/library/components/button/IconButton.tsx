import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";

import { Button } from "./Button";
import styles from "./Button.module.scss";

type Props = Omit<ComponentProps<typeof Button>, "icon" | "iconPosition" | "children" | "aria-label" | "aria-labelledby"> & {
  icon: LucideIcon;
  label: string;
};

export function IconButton({ icon: Icon, label, size = "md", className, ...props }: Props): React.JSX.Element {
  return (
    <Button
      {...props}
      size={size}
      aria-label={label}
      className={[styles.iconButton, styles[`icon-size-${size}`], className].filter(Boolean).join(" ")}>
      <Icon aria-hidden="true" strokeWidth={2.75} />
    </Button>
  );
}
