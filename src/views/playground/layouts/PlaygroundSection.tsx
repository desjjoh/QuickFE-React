import type { ReactNode } from 'react'
import { FlexBox } from '@/library/components/flex/FlexBox'
import { BlockText } from '@/library/components/text/BlockText'

export function PlaygroundSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <FlexBox direction="column" gap={4}>
      <BlockText element="h3">{title}</BlockText>
      <FlexBox direction="column" alignItems="flex-start" gap={6}>
        {children}
      </FlexBox>
    </FlexBox>
  )
}
