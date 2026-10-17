import { NavLink, useMatch, useResolvedPath, type NavLinkProps } from 'react-router-dom'
import { useTabsContext } from './TabsContext'
import styles from './Tabs.module.scss'

export function TabRouter({
  children,
  className,
  end = true,
  to,
  relative,
  caseSensitive,
  ...props
}: NavLinkProps) {
  const { tone } = useTabsContext()
  const path = useResolvedPath(to, { relative })
  const active = !!useMatch({ path: path.pathname, end, caseSensitive })
  return (
    <NavLink
      {...props}
      to={to}
      relative={relative}
      caseSensitive={caseSensitive}
      end={end}
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      className={(state) =>
        [
          styles.tab,
          state.isActive && styles.active,
          styles[`tone-${tone}`],
          typeof className === 'function' ? className(state) : className,
        ]
          .filter(Boolean)
          .join(' ')
      }
    >
      {(state) => (
        <span role="presentation">
          {typeof children === 'function' ? children(state) : children}
        </span>
      )}
    </NavLink>
  )
}
