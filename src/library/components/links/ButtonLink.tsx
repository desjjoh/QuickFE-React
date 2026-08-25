import type {
  AnchorHTMLAttributes,
  ComponentType,
  ReactNode,
  SVGProps,
} from "react";
import { Link, type To } from "react-router-dom";

import type { Radius, Size, Tone, Variant } from "../button/buttons";

import "./ButtonLink.module.scss";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to?: To;
  href?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  radius?: Radius;
  icon?: IconComponent;
  iconPosition?: "start" | "end";
  children?: ReactNode;
};

function isRouteObject(value: To | undefined): boolean {
  return typeof value === "object" && value !== null;
}

function isAbsoluteUrl(value: string | undefined): boolean {
  return (
    typeof value === "string" &&
    (/^[a-z][a-z\d+.-]*:/i.test(value) || value.startsWith("//"))
  );
}

export function ButtonLink({
  to,
  href,
  external = false,
  target,
  rel,
  variant = "solid",
  tone = "primary",
  size = "md",
  radius = "sm",
  icon: Icon,
  iconPosition = "end",
  children,
  className,
  ...rest
}: ButtonLinkProps): React.JSX.Element {
  const stringDestination = typeof to === "string" ? to : href;
  const usesRouterLink =
    isRouteObject(to) || (!external && !isAbsoluteUrl(stringDestination));

  const routerDestination = to ?? href ?? "/";
  const anchorHref = stringDestination ?? "#";

  const linkTarget = target ?? (external ? "_blank" : undefined);
  const linkRel =
    rel ?? (linkTarget === "_blank" ? "noopener noreferrer" : undefined);

  const buttonClasses = [
    "button-link",
    `tone-${tone}`,
    `variant-${variant}`,
    `size-${size}`,
    `radius-${radius}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <span className="button__content">
      {Icon && iconPosition === "start" && (
        <Icon
          className="button__icon button__icon--start"
          aria-hidden="true"
          strokeWidth={3}
        />
      )}

      <span className="button__label">{children}</span>

      {Icon && iconPosition === "end" && (
        <Icon
          className="button__icon button__icon--end"
          aria-hidden="true"
          strokeWidth={3}
        />
      )}
    </span>
  );

  if (usesRouterLink) {
    return (
      <Link
        {...rest}
        to={routerDestination}
        target={linkTarget}
        rel={linkRel}
        className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <a
      {...rest}
      href={anchorHref}
      target={linkTarget}
      rel={linkRel}
      className={buttonClasses}>
      {content}
    </a>
  );
}
