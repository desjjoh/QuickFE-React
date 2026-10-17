import { cloneElement, type ReactElement } from 'react'

import { useViewport } from '@/shared/hooks/useViewport'

import styles from '../styles/AppLayout.module.scss'

type LayoutElement = ReactElement<{
  className?: string
}>

type Props = {
  top: LayoutElement
  bottomLeft: LayoutElement
  bottomRight: LayoutElement
}

function withClassName(element: LayoutElement, className: string) {
  return cloneElement(element, {
    className: [element.props.className, className].filter(Boolean).join(' '),
  })
}

export function AppLayout({ top, bottomLeft, bottomRight }: Props): React.JSX.Element {
  const { isDesktop } = useViewport()

  return (
    <div className={[styles.layout, !isDesktop && styles.stacked].filter(Boolean).join(' ')}>
      {withClassName(top, styles.top)}
      {withClassName(bottomLeft, styles.bottomLeft)}
      {withClassName(bottomRight, styles.bottomRight)}
    </div>
  )
}
