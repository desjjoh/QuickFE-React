import type { ButtonHTMLAttributes } from "react";
import { Loader2, type LucideIcon } from "lucide-react";

import type { Radius, Size, Tone, Variant } from "./buttons";

import styles from "./Button.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  radius?: Radius;
  icon?: LucideIcon;
  iconPosition?: "start" | "end";
};

function classNames(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  type = "button",
  disabled = false,
  loading = false,
  variant = "solid",
  tone = "primary",
  size = "md",
  radius = "sm",
  icon: Icon,
  iconPosition = "end",
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classNames(
        styles.button,
        styles[`tone-${tone}`],
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        styles[`radius-${radius}`],
        loading && styles["is-loading"],
        className,
      )}>
      <span className={styles.buttonContent}>
        {Icon && iconPosition === "start" && (
          <Icon
            className={classNames(styles.buttonIcon, styles.buttonIconStart)}
            aria-hidden="true"
            strokeWidth={3}
          />
        )}

        <span className={styles.buttonLabel}>{children}</span>

        {Icon && iconPosition === "end" && (
          <Icon
            className={classNames(styles.buttonIcon, styles.buttonIconEnd)}
            aria-hidden="true"
            strokeWidth={3}
          />
        )}
      </span>

      {loading && (
        <span className={styles.buttonLoading} aria-hidden="true">
          <Loader2 />
        </span>
      )}
    </button>
  );
}
