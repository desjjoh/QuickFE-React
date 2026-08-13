import type { CSSProperties, HTMLAttributes } from "react";

import type {
  Block,
  Font,
  Leading,
  Size,
  TextAlign,
  Tone,
  Weight,
} from "./text";

import styles from "./Text.module.scss";

type TextStyle = CSSProperties & {
  "--text-clamp"?: number;
};

type Props = HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  element?: Block;
  size?: Size;
  weight?: Weight;
  leading?: Leading;
  font?: Font;
  truncate?: boolean;
  noWrap?: boolean;
  textAlign?: TextAlign;
  clamp?: number;
  spaced?: boolean;
  whiteSpace?: "normal" | "pre" | "pre-wrap" | "pre-line";
};

function classNames(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function BlockText({
  tone,
  element: Component = "p",
  size,
  weight,
  leading,
  font,
  truncate = false,
  noWrap = false,
  textAlign = "left",
  clamp,
  spaced = false,
  whiteSpace,
  className,
  style,
  children,
  ...props
}: Props) {
  const textStyle: TextStyle = {
    ...style,
    whiteSpace: whiteSpace ?? style?.whiteSpace,
    "--text-clamp": clamp,
  };

  return (
    <Component
      {...props}
      className={classNames(
        styles.blockText,
        truncate && styles["is-truncated"],
        noWrap && styles["no-wrap"],
        clamp !== undefined && styles["is-clamped"],
        tone && styles[`tone-${tone}`],
        size && styles[`size-${size}`],
        weight && styles[`weight-${weight}`],
        leading && styles[`leading-${leading}`],
        font && styles[`font-${font}`],
        textAlign && styles[`align-${textAlign}`],
        spaced && styles["letter-spaced"],
        className,
      )}
      style={textStyle}>
      {children}
    </Component>
  );
}
