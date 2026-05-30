import * as THREE from 'three'

export function setupHeroLighting(scene: THREE.Scene): THREE.Light[] {
  const lights: THREE.Light[] = []

  const key = new THREE.SpotLight('#ffcc88', 2.5, 40, 0.4, 0.8, 1)
  key.position.set(6, 4, 5)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.bias = -0.0002
  key.target.position.set(0, 0, 0)
  scene.add(key.target)
  scene.add(key)
  lights.push(key)

  const fill = new THREE.DirectionalLight('#8899cc', 0.3)
  fill.position.set(-5, 2, 3)
  scene.add(fill)
  lights.push(fill)

  const rim = new THREE.DirectionalLight('#ffaa55', 0.8)
  rim.position.set(0, -3, -5)
  scene.add(rim)
  lights.push(rim)

  const ambient = new THREE.AmbientLight('#1a1208', 0.5)
  scene.add(ambient)
  lights.push(ambient)

  return lights
}
