import type { ReactNode } from 'react'
import styles from './Playground.module.scss'

export function PlaygroundTable({ head, children }: { head?: ReactNode; children: ReactNode }) {
  return (
    <div className={styles.tableViewport}>
      <table className={styles.table}>
        {head && <thead>{head}</thead>}
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
