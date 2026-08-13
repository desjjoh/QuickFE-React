import type { HTMLAttributes } from "react";

import type { Font, Inline, Leading, Size, Tone, Weight } from "./text";

import styles from "./Text.module.scss";

type Props = HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  element?: Inline;
  size?: Size;
  weight?: Weight;
  leading?: Leading;
  font?: Font;
  truncate?: boolean;
};

function classNames(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function InlineText({
  tone,
  element: Component = "span",
  size,
  weight,
  leading,
  font,
  truncate = false,
  className,
  children,
  ...props
}: Props) {
  return (
    <Component
      {...props}
      className={classNames(
        styles.inlineText,
        tone && styles[`tone-${tone}`],
        size && styles[`size-${size}`],
        weight && styles[`weight-${weight}`],
        leading && styles[`leading-${leading}`],
        font && styles[`font-${font}`],
        truncate && styles["is-truncated"],
        className,
      )}>
      {children}
    </Component>
  );
}
