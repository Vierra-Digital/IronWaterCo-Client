'use client'

import { sectionVh, type PinnedSectionId } from '../penthouse/storySections'
import { useStoryCamera } from '../StoryCameraContext'

export function useSectionVh(sectionId: PinnedSectionId): number {
  const { mobile } = useStoryCamera()
  return sectionVh(sectionId, mobile)
}
