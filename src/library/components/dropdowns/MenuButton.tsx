import type { ComponentPropsWithoutRef } from "react";
import { useDropdownContext } from "./DropdownContext";
import type { Tone } from "./dropdowns";
import styles from "./Dropdown.module.scss";

type Props = ComponentPropsWithoutRef<"button"> & { active?: boolean; tone?: Tone };

export function MenuButton({ active = false, disabled = false, tone, className, children, onPointerMove, ...props }: Props): React.JSX.Element {
  const { requestItemFocus } = useDropdownContext();
  return (
    <button
      {...props} type="button" role="menuitem" disabled={disabled}
      aria-disabled={disabled ? "true" : undefined}
      className={[styles["menu-item"], active && styles["is-active"], tone && styles[`tone-${tone}`], className].filter(Boolean).join(" ")}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!disabled && !event.defaultPrevented) requestItemFocus(event.currentTarget);
      }}>
      <span className={styles.button__content}>{children}</span>
    </button>
  );
}
