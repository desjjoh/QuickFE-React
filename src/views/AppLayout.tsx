import { cloneElement, type ReactElement } from "react";

import styles from "./AppLayout.module.scss";

type LayoutElement = ReactElement<{
  className?: string;
}>;

type Props = {
  top: LayoutElement;
  bottomLeft: LayoutElement;
  bottomRight: LayoutElement;
};

function withClassName(element: LayoutElement, className: string) {
  return cloneElement(element, {
    className: [element.props.className, className].filter(Boolean).join(" "),
  });
}

export function AppLayout({ top, bottomLeft, bottomRight }: Props) {
  return (
    <div className={styles.layout}>
      {withClassName(top, styles.top)}
      {withClassName(bottomLeft, styles.bottomLeft)}
      {withClassName(bottomRight, styles.bottomRight)}
    </div>
  );
}
