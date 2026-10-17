import { useEffect, useState, type ReactNode } from 'react'
import styles from './Tabs.module.scss'

// Keep the outgoing panel until its fade completes, then mount the incoming panel.
export function TabPanel({
  activeTab,
  panels,
  id,
}: {
  activeTab: string
  panels: Partial<Record<string, ReactNode>>
  id: string
}) {
  const [{ tab: displayedTab, animate }, setPanel] = useState({ tab: activeTab, animate: false })
  const changing = activeTab !== displayedTab
  useEffect(() => {
    if (!changing) return
    const timeout = window.setTimeout(
      () => setPanel({ tab: activeTab, animate: true }),
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 150,
    )
    return () => window.clearTimeout(timeout)
  }, [activeTab, changing])
  if (panels[displayedTab] === undefined) return null
  return (
    <div
      key={displayedTab}
      id={`${id}-panel-${displayedTab}`}
      role="tabpanel"
      aria-labelledby={`${id}-tab-${displayedTab}`}
      tabIndex={0}
      inert={changing}
      className={[styles.body, animate && styles.entering, changing && styles.leaving]
        .filter(Boolean)
        .join(' ')}
    >
      {panels[displayedTab]}
    </div>
  )
}
