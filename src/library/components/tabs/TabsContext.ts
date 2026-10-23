import { createContext, useContext } from 'react'
import type { TabsContextValue } from './tabs'

export const TabsContext = createContext<TabsContextValue | null>(null)
export function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext)

  if (!context) throw new Error('Tab must be used inside <TabLayout>')

  return context
}
