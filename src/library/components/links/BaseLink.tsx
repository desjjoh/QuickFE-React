import type { AnchorHTMLAttributes, ReactNode } from 'react'

import type { Tone, Underline } from './links'

import styles from './Links.module.scss'

type BaseLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  tone?: Tone
  external?: boolean
  underline?: Underline
  children?: ReactNode
}

export function BaseLink({
  href,
  tone = 'primary',
  external = false,
  underline = 'always',
  children,
  className,
  target,
  rel,
  ...rest
}: BaseLinkProps): React.JSX.Element {
  const resolvedTarget = target ?? (external ? '_blank' : undefined)
  const resolvedRel = rel ?? (resolvedTarget === '_blank' ? 'noopener noreferrer' : undefined)

  return (
    <a
      {...rest}
      href={href}
      className={[styles.link, styles[`tone-${tone}`], styles[`underline-${underline}`], className]
        .filter(Boolean)
        .join(' ')}
      target={resolvedTarget}
      rel={resolvedRel}
    >
      {children}
    </a>
  )
}
