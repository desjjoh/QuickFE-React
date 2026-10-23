import type { ComponentPropsWithoutRef } from 'react'
import { useTabsContext } from './TabsContext'
import styles from './Tabs.module.scss'

type Props = Omit<ComponentPropsWithoutRef<'button'>, 'id'> & { id: string }

export function TabButton({ id, children, className, onClick, disabled, ...props }: Props) {
  const context = useTabsContext()
  const active = context.activeTab === id

  return (
    <button
      {...props}
      type="button"
      id={`${context.id}-tab-${id}`}
      role="tab"
      disabled={disabled}
      aria-selected={active}
      aria-controls={context.hasPanel(id) ? `${context.id}-panel-${id}` : undefined}
      tabIndex={active && !disabled ? 0 : -1}
      className={[styles.tab, active && styles.active, styles[`tone-${context.tone}`], className]
        .filter(Boolean)
        .join(' ')}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) context.activate(id)
      }}
    >
      <span>{children}</span>
    </button>
  )
}
