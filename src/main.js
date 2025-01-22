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


camera.position.set(6, 8, 50)
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



const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 500, 1000)
scene.add(pointLight)

const axesHelper = new THREE.AxesHelper(20)
scene.add(axesHelper)



const sunGeo = new THREE.SphereGeometry(4, 32, 32)
const sunMat = new THREE.MeshStandardMaterial({ map: textureLoader.load(sunTexture) })
const sun = new THREE.Mesh(sunGeo, sunMat)
scene.add(sun)

const mercuryGeo = new THREE.SphereGeometry(2, 32, 32)
const mercuryMat = new THREE.MeshStandardMaterial({ map: textureLoader.load(mercuryTexture) })
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat)

mercury.position.set(10, 0, 0)

const mercuryObj = new THREE.Object3D()
scene.add(mercuryObj)

mercuryObj.add(mercury)

const saturnGeo = new THREE.SphereGeometry(4)
const saturnMat = new THREE.MeshStandardMaterial({ map: textureLoader.load(saturnTexture) })
const saturn = new THREE.Mesh(saturnGeo, saturnMat)
scene.add(saturn)
saturn.position.set(25, 0, 0)
const saturnRingGeo = new THREE.RingGeometry(2.5, 6.5)
const saturnRingMat = new THREE.MeshStandardMaterial({ map: textureLoader.load(saturnRingTexture), side: THREE.DoubleSide })
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat)
saturn.add(saturnRing)

saturn.rotation.y = -0.2   * Math.PI
saturn.rotation.x = -0.4 * Math.PI


function animate(){
  sun.rotateY(0.002)
  mercury.rotateY(0.009)
  mercuryObj.rotateY(0.01)
  renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})