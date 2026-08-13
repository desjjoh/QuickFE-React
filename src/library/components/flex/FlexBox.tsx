import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import "./FlexBox.module.scss";

type FlexDirection = CSSProperties["flexDirection"];
type FlexWrap = CSSProperties["flexWrap"];
type JustifyContent = CSSProperties["justifyContent"];
type AlignItems = CSSProperties["alignItems"];
type AlignSelf = CSSProperties["alignSelf"];
type JustifySelf = CSSProperties["justifySelf"];
type OverflowX = CSSProperties["overflowX"];
type OverflowY = CSSProperties["overflowY"];

type FlexBoxStyle = CSSProperties & {
  "--flex-gap-x": number;
  "--flex-gap-y": number;
  "--padding": number;
};

export type FlexBoxProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "style"
> & {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;

  inline?: boolean;

  grow?: boolean;
  shrink?: boolean;

  fullWidth?: boolean;
  fullHeight?: boolean;

  gap?: number;
  gapX?: number;
  gapY?: number;
  padding?: number;

  direction?: FlexDirection;
  wrap?: FlexWrap;

  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  justifySelf?: JustifySelf;

  overflowX?: OverflowX;
  overflowY?: OverflowY;
};

export function FlexBox({
  children,
  className,
  style,

  inline = false,

  grow = false,
  shrink = true,

  fullWidth = false,
  fullHeight = false,

  gap = 0,
  gapX,
  gapY,
  padding = 0,

  direction = "row",
  wrap = "nowrap",

  justifyContent = "flex-start",
  alignItems = "stretch",
  alignSelf = "auto",
  justifySelf = "auto",

  overflowX,
  overflowY,

  ...rest
}: FlexBoxProps) {
  const resolvedGapX = gapX ?? gap;
  const resolvedGapY = gapY ?? gap;

  const flexStyle: FlexBoxStyle = {
    "--flex-gap-x": resolvedGapX,
    "--flex-gap-y": resolvedGapY,
    "--padding": padding,

    display: inline ? "inline-flex" : "flex",
    width: fullWidth ? "100%" : "auto",
    height: fullHeight ? "100%" : undefined,
    overflowX,
    overflowY,
    flexDirection: direction,
    justifyContent,
    alignItems,
    alignSelf,
    justifySelf,
    flexGrow: grow ? 1 : 0,
    flexShrink: shrink ? 1 : 0,
    flexWrap: wrap,

    ...style,
  };

  return (
    <div
      className={["flex-box", className].filter(Boolean).join(" ")}
      style={flexStyle}
      {...rest}>
      {children}
    </div>
  );
}
