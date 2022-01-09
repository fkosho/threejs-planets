import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { MeshStandardMaterial, Vector3 } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const planetTexture = textureLoader.load('/textures/particles/11.png')

/**
 * Test meshes
 */
// Material
const material = new THREE.MeshStandardMaterial({ 
    map: planetTexture,
    color: '#ffffff'
})

// floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 4, 4),
    material
)
scene.add(floor)
floor.rotation.x = - Math.PI / 2
floor.position.y = - 3

// cube
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    material
)
scene.add(cube)
cube.position.set(0, 0, 0)

// sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    material
)
scene.add(sphere)
sphere.position.set(0, 0, - 5)

// torus
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.3, 32, 32),
    material
)
scene.add(torus)
torus.position.set(0, 0, 5)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 1, 3)
scene.add(camera)



/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 2, 0)
scene.add(directionalLight)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Events
 */
// Click
let currentAngle = 0
let destinationAngle = 0

window.addEventListener('click', () =>
{
    // if(destinationAngle == currentAngle)
    // {
        destinationAngle = currentAngle + Math.round(Math.PI / 2 * 100000) / 100000
    // }
})


/**
 * Animate
 */
const clock = new THREE.Clock()
let currentTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - currentTime
    currentTime = elapsedTime

    // Animate Rotation
    if(currentAngle < destinationAngle)
    {
        currentAngle += Math.PI / 100
    }

    camera.position.x = Math.sin(currentAngle) * 9
    camera.position.z = Math.cos(currentAngle) * 9

    camera.lookAt(new THREE.Vector3(0, 0, 0))

    // console.log(destinationAngle, currentAngle)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()