import { heroScenes } from '../../../data/homepage'

/** Manus hero image URLs used for the photo-mapped 3D penthouse. */
export const HERO_IMAGE_PATHS = heroScenes.map((s) => s.image) as [
  string,
  string,
  string,
  string,
  string,
]
