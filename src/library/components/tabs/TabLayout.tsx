import { Children, Fragment, isValidElement, useId, useState, type ReactNode } from 'react'
import { TabsContext } from './TabsContext'
import { TabHeader } from './TabHeader'
import { TabPanel } from './TabPanel'
import type { TabId, Tone } from './tabs'
import styles from './Tabs.module.scss'

type Props = {
  tabs: ReactNode
  panels?: Partial<Record<TabId, ReactNode>>
  value?: TabId
  onValueChange?: (value: TabId) => void
  tone?: Tone
  label?: string
}

function firstTabId(nodes: ReactNode): TabId | undefined {
  for (const node of Children.toArray(nodes)) {
    if (!isValidElement<{ id?: string; disabled?: boolean; children?: ReactNode }>(node)) continue
    if (node.type === Fragment) {
      const id = firstTabId(node.props.children)
      if (id !== undefined) return id
    }
    if (typeof node.props.id === 'string' && !node.props.disabled) return node.props.id
  }
}

export function TabLayout({
  tabs,
  panels = {},
  value,
  onValueChange,
  tone = 'primary',
  label,
}: Props) {
  const id = useId()
  const [internalValue, setInternalValue] = useState<TabId>()
  const activeTab = value ?? internalValue ?? firstTabId(tabs) ?? ''
  return (
    <TabsContext.Provider
      value={{
        id,
        activeTab,
        tone,
        hasPanel: (key) => panels[key] !== undefined,
        activate: (key) => {
          setInternalValue(key)
          onValueChange?.(key)
        },
      }}
    >
      <div className={styles.layout}>
        <TabHeader aria-label={label}>{tabs}</TabHeader>
        <TabPanel activeTab={activeTab} panels={panels} id={id} />
      </div>
    </TabsContext.Provider>
  )
}
