import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { setupHeroLighting } from './HeroLighting'
import {
  createHeroObjects,
  setupEnvironment,
  updateParticles,
  type HeroObjectRefs,
} from './HeroObjects'
import { applyObjectScroll } from './applyObjectScroll'
import {
  INITIAL_OBJECT_SCROLL,
  type ObjectScrollState,
} from './objectScrollState'

export type CameraState = { x: number; y: number; z: number }

export type HeroSceneHandle = {
  objects: HeroObjectRefs
  camera: THREE.PerspectiveCamera
  cameraState: CameraState
  objectScroll: ObjectScrollState
  applyMouseParallax: (targetX: number, targetY: number) => void
  dispose: () => void
}

export function createHeroScene(container: HTMLElement, mobile: boolean): HeroSceneHandle {
  const width = container.clientWidth || window.innerWidth
  const height = container.clientHeight || window.innerHeight
  const dpr = Math.min(window.devicePixelRatio, mobile ? 1 : 2)

  const scene = new THREE.Scene()
  scene.background = null

  const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 100)
  const cameraState: CameraState = { x: 0, y: -0.5, z: 8 }
  const objectScroll: ObjectScrollState = { ...INITIAL_OBJECT_SCROLL }

  const renderer = new THREE.WebGLRenderer({
    antialias: !mobile,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(dpr)
  renderer.setSize(width, height)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.appendChild(renderer.domElement)

  setupHeroLighting(scene)
  const envMap = setupEnvironment(scene, renderer)
  const objects = createHeroObjects(scene, envMap, mobile)

  let composer: EffectComposer | null = null
  if (!mobile) {
    composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), 0.3, 0.5, 0.8))
  }

  const clock = new THREE.Clock()
  let mouseTarget = { x: 0, y: 0 }
  let raf = 0
  let disposed = false

  const applyMouseParallax = (targetX: number, targetY: number) => {
    if (mobile) return
    mouseTarget = { x: targetX, y: targetY }
  }

  const animate = () => {
    if (disposed) return
    raf = requestAnimationFrame(animate)
    const elapsed = clock.getElapsedTime()
    const breathY = Math.sin(elapsed * 0.2) * 0.001
    const breathZ = Math.sin(elapsed * 0.3) * 0.002
    const mx = mobile ? 0 : mouseTarget.x
    const my = mobile ? 0 : mouseTarget.y

    camera.position.set(
      cameraState.x + mx * 0.5,
      cameraState.y + my * 0.3 + breathY,
      cameraState.z + breathZ
    )
    camera.lookAt(0, 0, 0)

    applyObjectScroll(objects, objectScroll, mx, mobile)

    updateParticles(objects.particles, objects.particleData)

    if (composer) composer.render()
    else renderer.render(scene, camera)
  }
  animate()

  const onResize = () => {
    const w = container.clientWidth
    const h = container.clientHeight
    if (!w || !h) return
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    composer?.setSize(w, h)
  }
  window.addEventListener('resize', onResize)

  return {
    objects,
    camera,
    cameraState,
    objectScroll,
    applyMouseParallax,
    dispose: () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      objects.dispose()
      envMap.dispose()
      composer?.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    },
  }
}
