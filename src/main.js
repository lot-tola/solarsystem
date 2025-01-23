import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import * as gui from 'dat.gui'
import starsTexture from '/stars.jpg'
import earthTexture from '/earth.jpg'
import jupiterTexture from '/jupiter.jpg'
import marsTexture from '/mars.jpg'
import mercuryTexture from '/mercury.jpg'
import neptuneTexture from '/neptune.jpg'
import plutoTexture from '/pluto.jpg'
import saturnRingTexture from '/saturn-ring.png'
import saturnTexture from '/saturn.jpg'
import sunTexture from '/sun.jpg'
import uranusRingTexture from '/uranus-ring.png'
import uranusTexture from '/uranus.jpg'
import venusTexture from '/venus.jpg'





const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


renderer.setClearColor(0x000000)


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

const orbit = new OrbitControls(camera, renderer.domElement)


camera.position.set(6, 80, 300)
orbit.update()

const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
])



const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1000, 1000)
scene.add(pointLight)

const sunGeo = new THREE.SphereGeometry(10, 32, 32)
const sunMat = new THREE.MeshStandardMaterial({ map: textureLoader.load(sunTexture) })
const sun = new THREE.Mesh(sunGeo, sunMat)
scene.add(sun)


const createPlanet = (size, width, height, texture, position, ring) => {
  const planetGeo = new THREE.SphereGeometry(size, width, height)
  const planetMat = new THREE.MeshStandardMaterial({ map: textureLoader.load(texture) })
  const planet = new THREE.Mesh(planetGeo, planetMat)
  planet.position.set(position, 0, 0)
  const planetObj = new THREE.Object3D()
  if(ring){
    const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32)
    const ringMat = new THREE.MeshStandardMaterial({ map: textureLoader.load(ring.texture), side: THREE.DoubleSide})
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = -0.5 * Math.PI
    planet.add(ringMesh)
  }
  planetObj.add(planet)
  scene.add(planetObj)
  return {planet, planetObj}
}

const mercury = createPlanet(3.2, 32, 32, mercuryTexture, 28)
const venus = createPlanet(5.8, 32, 32, venusTexture, 44)
const earth = createPlanet(6, 32, 32, earthTexture, 62)
const mars = createPlanet(4, 32, 32, marsTexture, 78)
const jupiter = createPlanet(12, 50, 50, jupiterTexture, 100)
const saturn = createPlanet(10, 50, 50, saturnTexture, 138, { innerRadius: 10, outerRadius: 20, texture: saturnRingTexture })
const uranus = createPlanet(7, 50, 50, uranusTexture, 176, { innerRadius: 7, outerRadius: 12, texture: uranusRingTexture })
const neptune = createPlanet(7, 50, 50, neptuneTexture, 200)
const pluto = createPlanet(2.8, 25, 25, plutoTexture, 216)



function animate(){

  // self-rotation
  sun.rotateY(0.004)
  mercury.planet.rotateY(0.004)
  venus.planet.rotateY(0.002)
  earth.planet.rotateY(0.02)
  mars.planet.rotateY(0.018)
  jupiter.planet.rotateY(0.04)
  saturn.planet.rotateY(0.038)
  uranus.planet.rotateY(0.03)
  neptune.planet.rotateY(0.032)
  pluto.planet.rotateY(0.008)

  // rotation around the sun 
  mercury.planetObj.rotateY(0.04)
  venus.planetObj.rotateY(0.015)
  earth.planetObj.rotateY(0.01)
  mars.planetObj.rotateY(0.008)
  jupiter.planetObj.rotateY(0.002)
  saturn.planetObj.rotateY(0.0009)
  uranus.planetObj.rotateY(0.0004)
  neptune.planetObj.rotateY(0.0001)
  pluto.planetObj.rotateY(0.00007)

  
  renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})