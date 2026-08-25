import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, type To } from "react-router-dom";

import type { Tone } from "./links";

import "./AppLink.module.scss";

type AppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: To;
  tone?: Tone;
  external?: boolean;
  children?: ReactNode;
};

export function AppLink({
  href,
  tone = "primary",
  external = false,
  children,
  className,
  target,
  rel,
  ...rest
}: AppLinkProps): React.JSX.Element {
  const resolvedTarget = target ?? (external ? "_blank" : undefined);
  const resolvedRel = rel ?? (external ? "noopener noreferrer" : undefined);

  return (
    <Link
      {...rest}
      to={href}
      className={["app-link", `tone-${tone}`, className]
        .filter(Boolean)
        .join(" ")}
      target={resolvedTarget}
      rel={resolvedRel}>
      {children}
    </Link>
  );
}
