import type { HeroObjectRefs } from './HeroObjects'
import type { ObjectScrollState } from './objectScrollState'

export function applyObjectScroll(
  objects: HeroObjectRefs,
  scroll: ObjectScrollState,
  mx: number,
  mobile: boolean
) {
  const parallaxX = mobile ? 0 : mx
  objects.faucetGroup.position.set(
    scroll.faucetX + parallaxX * 0.3,
    objects.faucetGroup.position.y,
    scroll.faucetZ
  )
  objects.faucetGroup.scale.setScalar(scroll.faucetScale)

  objects.showerHead.position.set(
    scroll.showerX + parallaxX * -0.15,
    objects.showerHead.position.y,
    scroll.showerZ
  )

  objects.bathtub.position.x = scroll.bathtubX
  objects.bathtub.position.y = scroll.bathtubY
  objects.bathtub.scale.setScalar(scroll.bathtubScale)

  objects.doorHandleGroup.position.set(
    scroll.doorHandleX + parallaxX * 0.2,
    objects.doorHandleGroup.position.y,
    scroll.doorHandleZ
  )
}
