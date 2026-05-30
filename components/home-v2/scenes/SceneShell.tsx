'use client'

import { type ReactNode, type RefObject } from 'react'
import styles from '../home-v2-scrolly.module.css'

type SceneShellProps = {
  sceneRef: RefObject<HTMLElement>
  heightVh: number
  children: ReactNode
  className?: string
  id?: string
}

export default function SceneShell({
  sceneRef,
  heightVh,
  children,
  className,
  id,
}: SceneShellProps) {
  return (
    <section
      ref={sceneRef}
      id={id}
      className={`${styles.scene} ${className ?? ''}`}
      style={{ height: `${heightVh}vh` }}
    >
      <div className={styles.sticky}>
        <div className={styles.stickyInner}>{children}</div>
      </div>
    </section>
  )
}
