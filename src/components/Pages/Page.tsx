import React from 'react'
import styles from './Page.module.css'

export default function Page({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <h1>{title}</h1>
      {children}
    </div>
  )
}
