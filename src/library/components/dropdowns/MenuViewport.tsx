import type { ComponentProps } from "react";
import { FlexBox } from "../flex/FlexBox";
import styles from "./Dropdown.module.scss";

type Props = ComponentProps<typeof FlexBox>;

export function MenuViewport({ className, children, onMouseDown, ...props }: Props): React.JSX.Element {
  return (
    <FlexBox
      {...props} direction="column" padding={2}
      className={[styles.dropdown__menu__viewport, className].filter(Boolean).join(" ")}
      onMouseDown={(event) => { onMouseDown?.(event); event.preventDefault(); }}>
      {children}
    </FlexBox>
  );
}
