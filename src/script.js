import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { CubeTextureLoader, Group, MeshStandardMaterial, Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

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
 * Parameters
 */
const parameters = {
    // Camera
    cameraDistance: 10.4,
    cameraY: 2.2,

    // Saturn
    saturnRevolutionSpeed: 0.0333,
    saturnRevolutionRadius: 20,

    // Earth
    earthRevolutionSpeed: 1,
    earthRevolutionRadius: 5,
}

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()

/**
 * Textures
 */
// Loader
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const planetTexture = textureLoader.load('/textures/particles/11.png')

// water
const waterColorTexture = textureLoader.load('/textures/water_droplets/Water_Droplets_001_basecolor.jpg')
const waterNormalTexture = textureLoader.load('/textures/water_droplets/Water_Droplets_001_normal.jpg')
const waterAmbientOcclusionTexture = textureLoader.load('/textures/water_droplets/Water_Droplets_001_ambientOcclusion.jpg')
const waterHeightTexture = textureLoader.load('/textures/water_droplets/Water_Droplets_001_height.png')
const waterAlphaTexture = textureLoader.load('/textures/water_droplets/Water_Droplets_001_mask.jpg')
const waterRoughnessTexture = textureLoader.load('/textures/water_droplets/Water_Droplets_001_roughness.jpg')


/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        console.log(child)
    })
}


/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
    'textures/environmentMaps/rathaus_night/px.png',
    'textures/environmentMaps/rathaus_night/nx.png',
    'textures/environmentMaps/rathaus_night/py.png',
    'textures/environmentMaps/rathaus_night/ny.png',
    'textures/environmentMaps/rathaus_night/pz.png',
    'textures/environmentMaps/rathaus_night/nz.png',
])

scene.background = environmentMap

/**
 * Test meshes
 */
const planetsScale = 0.02

// Material
const sampleMaterial = new THREE.MeshStandardMaterial({ 
    map: planetTexture,
    color: '#ffffff'
})

const waterMaterial = new THREE.MeshStandardMaterial({
    map: waterColorTexture,
    normalMap: waterNormalTexture,
    displacementMap: waterHeightTexture,
    aoMap: waterAmbientOcclusionTexture,
    alphaMap: waterAlphaTexture,
    transparent: true,
    roughnessMap: waterRoughnessTexture,
    envMap: environmentMap
})

// cube
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    sampleMaterial
)
scene.add(cube)
cube.position.set(0, 0, 0)

// sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    waterMaterial
)
scene.add(sphere)
sphere.position.set(0, 0, - 5)

// torus
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.3, 32, 32),
    waterMaterial
)
scene.add(torus)
torus.position.set(0, 0, 5)

/**
 * Planets
 */
let planetGroup = new THREE.Group()
scene.add(planetGroup)

/**
 * Saturn
 */
let saturnGroup = null

gltfLoader.load(
    '/models/planets/saturn.glb',
    (gltf) =>
    {
        saturnGroup = gltf.scene
        saturnGroup.name = 'Saturn'

        saturnGroup.scale.set(planetsScale, planetsScale, planetsScale)
        saturnGroup.position.set(10, 0, 0)

        planetGroup.add(saturnGroup)
    }
)

/**
 * Earth
 */
let earthGroup = null

const earthSampleMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 10, 10),
    new THREE.MeshStandardMaterial({
        color: 0x0000ff
    })
)
earthGroup = earthSampleMesh
earthGroup.name = 'Earth'

planetGroup.add(earthSampleMesh)

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
// camera.position.set(0, 10, 15)
scene.add(camera)

let cameraOnChange = false

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
renderer.outputEncoding = THREE.sRGBEncoding

/**
 * Animate
 */
const clock = new THREE.Clock()
let currentTime = 0
let currentPlanet = null

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

/**
 * Mouse
 */
const mouse = new THREE.Vector2()

// Mouse move
window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
})

// Click
let currentIntersect = null

// Change camera position instantly

// window.addEventListener('click', () =>
// {
//     console.log(currentIntersect)
//     if(currentIntersect != null)
//     {
//         const toPlanetName = currentIntersect.object.name
//         const toPlanet = planetGroup.getObjectByName(toPlanetName)
//         changeCameraPosition(toPlanet)
//     } else
//     {
//         currentPlanet = null
//     }
// })

let gpn = ''

// Change camera position gradually
window.addEventListener('click', () =>
{
    if(currentIntersect != null)
    {
        const toPlanetName = currentIntersect.object.name
        const toPlanet = planetGroup.getObjectByName(toPlanetName)
        cameraOnChange = true
        gpn = toPlanet
    }
    console.log(cameraOnChange)
})

//
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - currentTime
    currentTime = elapsedTime

    // Rotate planets
    if(saturnGroup != null) {
        revolvePlanet(saturnGroup, parameters.saturnRevolutionSpeed, parameters.saturnRevolutionRadius, elapsedTime)
    }

    if(earthGroup != null) {
        revolvePlanet(earthSampleMesh, parameters.earthRevolutionSpeed, parameters.earthRevolutionRadius, elapsedTime)
    }
    


    // Rotate camera position while not changing focus planet
    // while not changing focus planet
    if(cameraOnChange == false) {
        switch(currentPlanet) {
            case null:
                camera.position.x = - Math.cos(elapsedTime * 0.1) * 15
                camera.position.y = 3
                camera.position.z = Math.sin(elapsedTime * 0.1) * 15
                break
                
            case 'Earth':
                if(earthGroup != null) {
                    camera.position.x = earthGroup.position.x * parameters.cameraDistance
                    camera.position.y = parameters.cameraY
                    camera.position.z = earthGroup.position.z * parameters.cameraDistance
                    break
                }    
            
            case 'Saturn':
                if(saturnGroup != null) {
                    camera.position.x = saturnGroup.position.x * parameters.cameraDistance
                    camera.position.y = parameters.cameraY
                    camera.position.z = saturnGroup.position.z * parameters.cameraDistance
                    break
                }
        }    
    } else
    // while changing focus planet
    {
        let startPosition = null
        let goalPosition = null

        if(currentPlanet != null) 
        {
            const startPlanetName = currentPlanet.name
            const startPlanet = planetGroup.getObjectByName(startPlanetName)
            console.log(startPlanet)
            startPosition = startPlanet.position // TODO: modify position. start position does not equal to startPlanet position but camera position.
        } else
        {
            startPosition = camera.position
        }

        const goalPlanet = gpn
        console.log(goalPlanet)

        console.log('Earth Position before', earthSampleMesh.position)
        goalPosition = goalPlanet.position.multiplyScalar(parameters.cameraDistance) // Error Cause
        console.log('Earth Position after', earthSampleMesh.position)


        const movedPosition = moveCameraPosition(startPosition, goalPosition, elapsedTime)
            // .multiplyScalar(parameters.cameraDistance)
        // console.log(movedPosition)

        camera.position.set(movedPosition.x, movedPosition.y, movedPosition.z)

    }

    camera.lookAt(new THREE.Vector3(0, 0, 0))

    console.log('Earth Position2', earthSampleMesh.position)
    console.log(cameraOnChange)

    // Cast a ray
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObject(earthSampleMesh)
    currentIntersect = intersects[0]

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



/**
 * Functions
 */

/**
 * Revolve arbitrary planet
 * @param {*} planet 
 * @param {Double} speed 
 * @param {Double} radius 
 * @param {Double} elapsedTime 
 */
function revolvePlanet(planet, speed, radius, elapsedTime) {
    planet.position.x = Math.cos(elapsedTime * speed) * radius
    planet.position.z = - Math.sin(elapsedTime * speed) * radius
}

/**
 * Switch camera position to other planet's back 
 */
function changeCameraPosition(toPlanet) {
    camera.position.set(
        toPlanet.position.x * parameters.cameraDistance,
        parameters.cameraY,
        toPlanet.position.z * parameters.cameraDistance
    )
    currentPlanet = toPlanet.name
}

/**
 * Move camera position to destination per frame
 * @param {Vector3} startPosition
 * @param {Vector3} goalPosition
 * 
 */
function moveCameraPosition(startPosition, goalPosition, elapsedTime) {
    let moveVector = new THREE.Vector3()
    let movedPosition = new THREE.Vector3()

    moveVector.subVectors(goalPosition, startPosition).multiplyScalar(elapsedTime).multiplyScalar(0.01)

    movedPosition.addVectors(startPosition, moveVector)

    console.log('Base Vector', startPosition)
    console.log('Move Vector', moveVector)
    console.log('Moved Position', movedPosition)
    console.log('Goal Position', goalPosition)

    if(movedPosition > goalPosition) { // TODO: this rogic is wrong.
        console.log('finish camera moving')
        cameraOnChange = false // TODO: the timing this code applied is too early
    }
    return movedPosition
}