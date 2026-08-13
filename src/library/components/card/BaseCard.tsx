import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import { CardContext } from "./CardContext";
import type { CardSize } from "./Card";

import styles from "./BaseCard.module.scss";

type Props = ComponentPropsWithoutRef<"section"> & {
  size?: CardSize;
  justifySelf?: CSSProperties["justifySelf"];
  alignSelf?: CSSProperties["alignSelf"];
};

function classNames(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function Card({
  size = "md",
  justifySelf = "auto",
  alignSelf = "auto",
  className,
  style,
  children,
  ...props
}: Props) {
  return (
    <CardContext.Provider value={{ isCard: true }}>
      <section
        {...props}
        className={classNames(
          styles.baseCard,
          styles[`size-${size}`],
          className,
        )}
        style={{
          ...style,
          alignSelf,
          justifySelf,
        }}>
        {children}
      </section>
    </CardContext.Provider>
  );
}
