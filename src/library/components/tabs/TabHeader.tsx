import type { HTMLAttributes } from 'react'
import styles from './Tabs.module.scss'

export function TabHeader({
  children,
  className,
  onKeyDown,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      role="tablist"
      className={[styles.header, className].filter(Boolean).join(' ')}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented || !(event.target instanceof HTMLElement)) return
        const target = event.target
        const header = event.currentTarget
        if (target.getAttribute('role') !== 'tab' || target.closest('[role="tablist"]') !== header)
          return
        const tabs = Array.from(
          header.querySelectorAll<HTMLElement>(
            '[role="tab"]:not([disabled]):not([aria-disabled="true"])',
          ),
        ).filter((tab) => tab.closest('[role="tablist"]') === header)
        if (!tabs.length) return
        const current = tabs.indexOf(target)
        let index: number
        switch (event.key) {
          case 'ArrowRight':
            index = (current + 1) % tabs.length
            break
          case 'ArrowLeft':
            index = (current - 1 + tabs.length) % tabs.length
            break
          case 'Home':
            index = 0
            break
          case 'End':
            index = tabs.length - 1
            break
          default:
            return
        }
        event.preventDefault()
        tabs[index]?.focus()
        tabs[index]?.click()
      }}
    >
      {children}
    </div>
  )
}
