import type { ReactNode } from 'react'
import { FlexBox } from '@/library/components/flex/FlexBox'

export function PlaygroundContent({ children }: { children: ReactNode }) {
  return (
    <FlexBox direction="column" justifyContent="flex-start" gap={16}>
      {children}
    </FlexBox>
  )
}
