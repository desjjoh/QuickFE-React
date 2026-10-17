import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { useDropdownContext } from './DropdownContext'
import type { Tone } from './dropdowns'
import styles from './Dropdown.module.scss'

type Props = ComponentProps<typeof Link> & {
  active?: boolean
  disabled?: boolean
  tone?: Tone
}

export function MenuRouter({
  active = false,
  disabled = false,
  tone,
  className,
  children,
  onPointerMove,
  onClick,
  tabIndex,
  ...props
}: Props): React.JSX.Element {
  const { requestItemFocus } = useDropdownContext()
  return (
    <Link
      {...props}
      role="menuitem"
      aria-disabled={disabled ? 'true' : undefined}
      tabIndex={disabled ? -1 : tabIndex}
      className={[
        styles['menu-item'],
        active && styles['is-active'],
        disabled && styles['is-disabled'],
        tone && styles[`tone-${tone}`],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault()
          event.stopPropagation()
          return
        }
        onClick?.(event)
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event)
        if (!disabled && !event.defaultPrevented) requestItemFocus(event.currentTarget)
      }}
    >
      <span className={styles.button__content}>{children}</span>
    </Link>
  )
}
