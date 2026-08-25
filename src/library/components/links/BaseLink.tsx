import type { AnchorHTMLAttributes, ReactNode } from "react";

import type { Tone } from "./links";

import styles from "./BaseLink.module.scss";

type BaseLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  tone?: Tone;
  external?: boolean;
  children?: ReactNode;
};

export function BaseLink({
  href,
  tone = "primary",
  external = false,
  children,
  className,
  target,
  rel,
  ...rest
}: BaseLinkProps): React.JSX.Element {
  const resolvedTarget = target ?? (external ? "_blank" : undefined);
  const resolvedRel = rel ?? (external ? "noopener noreferrer" : undefined);

  return (
    <a
      {...rest}
      href={href}
      className={[styles["base-link"], styles[`tone-${tone}`], className]
        .filter(Boolean)
        .join(" ")}
      target={resolvedTarget}
      rel={resolvedRel}>
      {children}
    </a>
  );
}
