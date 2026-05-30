'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { StoryCameraProgress } from './hooks/useStoryCameraProgress'

type StoryCameraContextValue = StoryCameraProgress & {
  storyTrackRef: React.RefObject<HTMLDivElement | null>
  mobile: boolean
}

const StoryCameraContext = createContext<StoryCameraContextValue | null>(null)

export function StoryCameraProvider({
  value,
  children,
}: {
  value: StoryCameraContextValue
  children: ReactNode
}) {
  return <StoryCameraContext.Provider value={value}>{children}</StoryCameraContext.Provider>
}

export function useStoryCamera() {
  const ctx = useContext(StoryCameraContext)
  if (!ctx) throw new Error('useStoryCamera must be used within StoryCameraProvider')
  return ctx
}
