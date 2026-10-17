import type { AnchorHTMLAttributes, ComponentType, SVGProps } from 'react'
import type { To } from 'react-router-dom'

import { ButtonLink } from '@/library/components/links/ButtonLink'
import type { Radius, Size, Tone, Variant } from '../button/buttons'

import styles from '../button/Button.module.scss'

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>

type IconButtonLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'children' | 'aria-label' | 'aria-labelledby'
> & {
  icon: IconComponent
  label: string
  to?: To
  href?: string
  external?: boolean
  target?: string
  rel?: string
  variant?: Variant
  tone?: Tone
  size?: Size
  radius?: Radius
}

export function IconButtonLink({
  icon: Icon,
  label,
  to,
  href,
  external = false,
  target,
  rel,
  variant = 'solid',
  tone = 'primary',
  size = 'md',
  radius = 'sm',
  className,
  ...rest
}: IconButtonLinkProps): React.JSX.Element {
  return (
    <ButtonLink
      {...rest}
      to={to}
      href={href}
      external={external}
      target={target}
      rel={rel}
      variant={variant}
      tone={tone}
      size={size}
      radius={radius}
      className={[styles.iconButton, styles[`icon-size-${size}`], className]
        .filter(Boolean)
        .join(' ')}
      aria-label={label}
    >
      <Icon aria-hidden="true" strokeWidth={2.75} />
    </ButtonLink>
  )
}
