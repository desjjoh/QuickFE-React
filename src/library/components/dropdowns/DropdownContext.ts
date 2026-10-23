import { createContext, useContext } from 'react'
import type { DropdownMenuContextValue } from './dropdowns'

export const DropdownContext = createContext<DropdownMenuContextValue | null>(null)

export function useDropdownContext(): DropdownMenuContextValue {
  const context = useContext(DropdownContext)

  if (!context) throw new Error('Menu items must be used inside <BaseDropdown>.')

  return context
}
