import gsap from 'gsap'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export type HeroObjectRefs = {
  bathtub: THREE.Mesh
  faucetGroup: THREE.Group
  showerHead: THREE.Mesh
  doorHandleGroup: THREE.Group
  droplets: THREE.Mesh[]
  particles: THREE.Points
  particleData: Float32Array
  base: {
    faucet: THREE.Vector3
    shower: THREE.Vector3
    doorHandle: THREE.Vector3
  }
  floatTweens: gsap.core.Tween[]
  dispose: () => void
}

const BRASS = {
  color: '#c9a96e',
  roughness: 0.35,
  metalness: 0.92,
}

function brassMaterial(envMap: THREE.Texture | null) {
  return new THREE.MeshStandardMaterial({
    color: BRASS.color,
    roughness: BRASS.roughness,
    metalness: BRASS.metalness,
    envMap: envMap ?? undefined,
    envMapIntensity: 1.5,
  })
}

export function setupEnvironment(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer
): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer)
  pmrem.compileEquirectangularShader()
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = env
  pmrem.dispose()
  return env
}

export function createHeroObjects(
  scene: THREE.Scene,
  envMap: THREE.Texture | null,
  mobile: boolean
): HeroObjectRefs {
  const floatTweens: gsap.core.Tween[] = []
  const disposables: THREE.BufferGeometry[] = []
  const materials: THREE.Material[] = []

  const track = <T extends THREE.BufferGeometry | THREE.Material>(item: T): T => {
    if (item instanceof THREE.BufferGeometry) disposables.push(item)
    else materials.push(item)
    return item
  }

  // Bathtub
  const tubGeo = track(new THREE.CapsuleGeometry(1.2, 0.8, mobile ? 8 : 16, mobile ? 16 : 32))
  const tubMat = track(
    new THREE.MeshStandardMaterial({
      color: '#f0ece4',
      roughness: 0.85,
      metalness: 0,
      envMap: envMap ?? undefined,
      envMapIntensity: 0.5,
    })
  )
  const bathtub = new THREE.Mesh(tubGeo, tubMat)
  bathtub.rotation.x = -0.1
  bathtub.position.set(0, 0, 0)
  bathtub.castShadow = true
  bathtub.receiveShadow = true
  scene.add(bathtub)

  floatTweens.push(
    gsap.to(bathtub.rotation, {
      y: 0.05,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    }),
    gsap.to(bathtub.position, {
      y: 0.08,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  )

  // Faucet group
  const faucetGroup = new THREE.Group()
  const brassMat = track(brassMaterial(envMap))
  const pipe = new THREE.Mesh(track(new THREE.CylinderGeometry(0.04, 0.04, 1.8, mobile ? 8 : 16)), brassMat)
  pipe.position.y = 0.9
  const arm = new THREE.Mesh(track(new THREE.CylinderGeometry(0.04, 0.04, 0.6, mobile ? 8 : 16)), brassMat)
  arm.rotation.z = Math.PI / 2
  arm.position.set(0.3, 1.8, 0)
  const spout = new THREE.Mesh(track(new THREE.SphereGeometry(0.06, mobile ? 8 : 16, mobile ? 8 : 16)), brassMat)
  spout.position.set(0.6, 1.8, 0)
  faucetGroup.add(pipe, arm, spout)
  faucetGroup.position.set(-2.5, 0.3, 3.5)
  scene.add(faucetGroup)

  floatTweens.push(
    gsap.to(faucetGroup.position, {
      y: '+=0.12',
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    }),
    gsap.to(faucetGroup.rotation, {
      y: 0.03,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  )

  // Shower head
  const showerHead = new THREE.Mesh(
    track(new THREE.TorusGeometry(0.5, 0.06, mobile ? 6 : 8, mobile ? 16 : 32, Math.PI)),
    brassMat.clone()
  )
  showerHead.position.set(2.8, 0.8, -2)
  showerHead.rotation.z = -0.2
  showerHead.castShadow = true
  scene.add(showerHead)

  floatTweens.push(
    gsap.to(showerHead.position, {
      y: '+=0.1',
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    }),
    gsap.to(showerHead.rotation, {
      y: Math.PI * 2,
      duration: 30,
      repeat: -1,
      ease: 'none',
    })
  )

  // Door handle
  const doorHandleGroup = new THREE.Group()
  const handleBar = new THREE.Mesh(
    track(new THREE.CylinderGeometry(0.03, 0.03, 0.8, mobile ? 8 : 12)),
    brassMat.clone()
  )
  handleBar.rotation.z = Math.PI / 2
  const backPlate = new THREE.Mesh(track(new THREE.BoxGeometry(0.08, 0.4, 0.04)), brassMat.clone())
  backPlate.matrixAutoUpdate = false
  backPlate.updateMatrix()
  doorHandleGroup.add(handleBar, backPlate)
  doorHandleGroup.position.set(3.8, -0.5, 4)
  scene.add(doorHandleGroup)

  floatTweens.push(
    gsap.to(doorHandleGroup.position, {
      y: '+=0.08',
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    }),
    gsap.to(doorHandleGroup.rotation, {
      x: 0.02,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  )

  // Droplets
  const droplets: THREE.Mesh[] = []
  const dropletCount = mobile ? 4 : 8
  for (let i = 0; i < dropletCount; i++) {
    const r = 0.04 + Math.random() * 0.05
    const dropletMat = track(
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        roughness: 0,
        metalness: 0,
        transmission: 0.9,
        thickness: 0.5,
        transparent: true,
        opacity: 0.7,
      })
    )
    const droplet = new THREE.Mesh(track(new THREE.SphereGeometry(r, 8, 8)), dropletMat)
    droplet.position.set(
      THREE.MathUtils.lerp(-4, 4, Math.random()),
      THREE.MathUtils.lerp(-2, 2, Math.random()),
      THREE.MathUtils.lerp(-3, 4, Math.random())
    )
    scene.add(droplet)
    droplets.push(droplet)

    const dur = 3 + Math.random() * 5
    floatTweens.push(
      gsap.to(droplet.position, {
        y: `+=${0.05 + Math.random() * 0.1}`,
        duration: dur / 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * dur,
      }),
      gsap.to(droplet.rotation, {
        x: Math.random() * 0.4,
        y: Math.random() * 0.4,
        z: Math.random() * 0.4,
        duration: dur,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    )
  }

  // Light particles
  const particleCount = mobile ? 10 : 30
  const positions = new Float32Array(particleCount * 3)
  const particleData = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = THREE.MathUtils.lerp(-5, 5, Math.random())
    positions[i * 3 + 1] = THREE.MathUtils.lerp(-2, 3, Math.random())
    positions[i * 3 + 2] = THREE.MathUtils.lerp(-4, 5, Math.random())
    particleData[i * 3] = (Math.random() - 0.5) * 0.002
    particleData[i * 3 + 1] = 0.001 + Math.random() * 0.0015
    particleData[i * 3 + 2] = (Math.random() - 0.5) * 0.001
  }
  const particleGeo = track(new THREE.BufferGeometry())
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particles = new THREE.Points(
    particleGeo,
    track(
      new THREE.PointsMaterial({
        color: '#c9a96e',
        size: 0.04,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      })
    )
  )
  scene.add(particles)

  const baseFaucet = faucetGroup.position.clone()
  const baseShower = showerHead.position.clone()
  const baseDoor = doorHandleGroup.position.clone()

  return {
    bathtub,
    faucetGroup,
    showerHead,
    doorHandleGroup,
    droplets,
    particles,
    particleData,
    base: {
      faucet: baseFaucet,
      shower: baseShower,
      doorHandle: baseDoor,
    },
    floatTweens,
    dispose: () => {
      floatTweens.forEach((t) => t.kill())
      disposables.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
      scene.remove(bathtub, faucetGroup, showerHead, doorHandleGroup, particles, ...droplets)
    },
  }
}

export function updateParticles(particles: THREE.Points, particleData: Float32Array) {
  const pos = particles.geometry.attributes.position
  if (!pos?.array) return
  const arr = pos.array as Float32Array
  const count = arr.length / 3
  for (let i = 0; i < count; i++) {
    arr[i * 3] += particleData[i * 3]
    arr[i * 3 + 1] += particleData[i * 3 + 1]
    arr[i * 3 + 2] += particleData[i * 3 + 2]
    if (arr[i * 3 + 1] > 3) {
      arr[i * 3 + 1] = -3
    }
  }
  pos.needsUpdate = true
}
