import type { ReactNode } from 'react'
import styles from './Playground.module.scss'

export function PlaygroundShowcase({ children }: { children: ReactNode }) {
  return <div className={styles.showcase}>{children}</div>
}
